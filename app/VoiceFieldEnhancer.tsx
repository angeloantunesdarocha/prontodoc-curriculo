"use client";

import { useEffect, useRef, useState } from "react";

type SpeechResult = {
  0: { transcript: string };
  isFinal?: boolean;
};

type SpeechEvent = {
  resultIndex?: number;
  results: ArrayLike<SpeechResult>;
};

type SpeechError = {
  error?: string;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort?(): void;
  onresult: ((event: SpeechEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechError) => void) | null;
};

type EditableField = HTMLInputElement | HTMLTextAreaElement;

type RegisteredField = {
  field: EditableField;
  button: HTMLButtonElement;
  parent: HTMLElement;
  label: string;
};

const ALLOWED_INPUT_TYPES = new Set(["text", "email", "tel", "search", "url"]);

function isEditableField(element: Element): element is EditableField {
  if (element.hasAttribute("data-no-voice")) return false;
  if (element instanceof HTMLTextAreaElement) return !element.disabled && !element.readOnly;
  if (!(element instanceof HTMLInputElement)) return false;
  return ALLOWED_INPUT_TYPES.has(element.type || "text") && !element.disabled && !element.readOnly;
}

function fieldLabel(field: EditableField) {
  const labelled = field.getAttribute("aria-label");
  if (labelled) return labelled.trim();

  const label = field.closest("label");
  if (label) {
    const directText = Array.from(label.childNodes)
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent?.trim())
      .filter(Boolean)
      .join(" ");
    if (directText) return directText;
  }

  const legend = field.closest("fieldset")?.querySelector(":scope > legend")?.textContent?.trim();
  return legend || field.placeholder || "este campo";
}

function normalizeTranscript(text: string, field: EditableField, label: string) {
  let result = text.replace(/\s+/g, " ").trim();

  if (field instanceof HTMLInputElement && field.type === "email") {
    result = result
      .toLocaleLowerCase("pt-BR")
      .replace(/\s+arroba\s+/g, "@")
      .replace(/\s+ponto\s+/g, ".")
      .replace(/\s+(traço|hífen)\s+/g, "-")
      .replace(/\s+(sublinhado|underline)\s+/g, "_")
      .replace(/\s+/g, "");
  }

  if (/habilidades/i.test(label)) {
    result = result.replace(/\s*,\s*/g, ", ");
  }

  return result;
}

function setReactFieldValue(field: EditableField, value: string) {
  const prototype = field instanceof HTMLTextAreaElement
    ? HTMLTextAreaElement.prototype
    : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;

  if (setter) setter.call(field, value);
  else field.value = value;

  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  field.focus({ preventScroll: true });
}

function positionButton(item: RegisteredField) {
  const { field, button, parent } = item;
  if (!field.isConnected || !parent.isConnected) return;

  const top = field.offsetTop + 7;
  const right = Math.max(7, parent.clientWidth - field.offsetLeft - field.offsetWidth + 7);
  button.style.top = `${top}px`;
  button.style.right = `${right}px`;
}

export default function VoiceFieldEnhancer() {
  const [notice, setNotice] = useState("");
  const registeredRef = useRef<Map<EditableField, RegisteredField>>(new Map());
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const activeRef = useRef<RegisteredField | null>(null);

  useEffect(() => {
    const registered = registeredRef.current;

    function resetActiveButton(expected?: RegisteredField) {
      const active = activeRef.current;
      if (!active || (expected && active !== expected)) return;
      active.button.classList.remove("is-listening");
      active.button.textContent = "🎤";
      active.button.setAttribute("aria-pressed", "false");
      active.button.title = `Falar no campo ${active.label}`;
      activeRef.current = null;
    }

    function stopRecognition() {
      const current = recognitionRef.current;
      recognitionRef.current = null;
      current?.stop();
      resetActiveButton();
    }

    function beginRecognition(item: RegisteredField) {
      if (activeRef.current === item) {
        stopRecognition();
        return;
      }

      stopRecognition();

      const speechWindow = window as typeof window & {
        SpeechRecognition?: new () => SpeechRecognitionLike;
        webkitSpeechRecognition?: new () => SpeechRecognitionLike;
      };
      const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

      if (!Recognition) {
        setNotice("O preenchimento por voz não está disponível neste navegador. No Android, abra o site pelo Chrome.");
        window.setTimeout(() => setNotice(""), 6000);
        return;
      }

      const recognition = new Recognition();
      recognition.lang = "pt-BR";
      recognition.continuous = true;
      recognition.interimResults = false;
      recognitionRef.current = recognition;
      activeRef.current = item;

      item.button.classList.add("is-listening");
      item.button.textContent = "■";
      item.button.setAttribute("aria-pressed", "true");
      item.button.title = "Parar de ouvir";
      setNotice(`Ouvindo o campo “${item.label}”. Fale naturalmente e toque novamente para parar.`);

      recognition.onresult = (event) => {
        if (recognitionRef.current !== recognition) return;

        const start = typeof event.resultIndex === "number"
          ? event.resultIndex
          : Math.max(0, event.results.length - 1);
        const pieces: string[] = [];

        for (let index = start; index < event.results.length; index += 1) {
          const transcript = event.results[index]?.[0]?.transcript;
          if (transcript) pieces.push(transcript);
        }

        const transcript = normalizeTranscript(pieces.join(" "), item.field, item.label);
        if (!transcript) return;

        const current = item.field.value.trim();
        const separator = !current
          ? ""
          : /habilidades/i.test(item.label)
            ? ", "
            : item.field instanceof HTMLInputElement && item.field.type === "email"
              ? ""
              : " ";
        setReactFieldValue(item.field, `${current}${separator}${transcript}`.trim());
      };

      recognition.onerror = (event) => {
        if (recognitionRef.current !== recognition) return;

        const permissionDenied = event.error === "not-allowed" || event.error === "service-not-allowed";
        setNotice(permissionDenied
          ? "O microfone foi bloqueado. Autorize o uso do microfone nas configurações do navegador."
          : "Não consegui reconhecer a fala. Verifique o microfone e tente novamente.");
        recognitionRef.current = null;
        resetActiveButton(item);
      };

      recognition.onend = () => {
        if (recognitionRef.current !== recognition) return;
        recognitionRef.current = null;
        resetActiveButton(item);
        window.setTimeout(() => setNotice(""), 2500);
      };

      try {
        recognition.start();
      } catch {
        setNotice("Não foi possível iniciar o microfone. Feche outra gravação e tente novamente.");
        if (recognitionRef.current === recognition) recognitionRef.current = null;
        resetActiveButton(item);
      }
    }

    function registerFields() {
      const fields = document.querySelectorAll(".resume-form input, .resume-form textarea");

      fields.forEach((element) => {
        if (!isEditableField(element) || registered.has(element)) return;

        const parent = (element.closest("label") || element.parentElement) as HTMLElement | null;
        if (!parent) return;

        const label = fieldLabel(element);
        const button = document.createElement("button");
        button.type = "button";
        button.className = "field-mic-button";
        button.textContent = "🎤";
        button.title = `Falar no campo ${label}`;
        button.setAttribute("aria-label", `Preencher ${label} por voz`);
        button.setAttribute("aria-pressed", "false");

        const item: RegisteredField = { field: element, button, parent, label };
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          beginRecognition(item);
        });

        parent.classList.add("voice-field-parent");
        element.classList.add("voice-field-input");
        parent.appendChild(button);
        registered.set(element, item);
        positionButton(item);
      });

      registered.forEach((item, field) => {
        if (field.isConnected) {
          positionButton(item);
          return;
        }
        item.button.remove();
        registered.delete(field);
      });
    }

    const observer = new MutationObserver(registerFields);
    observer.observe(document.body, { childList: true, subtree: true });
    registerFields();

    const reposition = () => registered.forEach(positionButton);
    window.addEventListener("resize", reposition);

    const beforePrint = () => {
      stopRecognition();
      if (document.querySelector(".builder-preview .resume-sheet")) {
        document.body.classList.add("resume-print-active");
      }
    };
    const afterPrint = () => document.body.classList.remove("resume-print-active");
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", reposition);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
      const current = recognitionRef.current;
      recognitionRef.current = null;
      current?.abort?.();
      current?.stop();
      registered.forEach((item) => {
        item.button.remove();
        item.field.classList.remove("voice-field-input");
        item.parent.classList.remove("voice-field-parent");
      });
      registered.clear();
      document.body.classList.remove("resume-print-active");
    };
  }, []);

  return notice ? <p className="voice-field-notice" role="status">{notice}</p> : null;
}
