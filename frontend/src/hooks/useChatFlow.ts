import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";
const { loadChatJson } = api;
import { saveHistory } from "../services/storage.js";

export interface Message {
  id: string;
  from: "doctor" | "user";
  text: string;
  options?: Array<{ text: string; next: string }>;
  image?: string;
}

// message: { id, from: 'doctor'|'user', text, options, image }
export default function useChatFlow(cancerType: string | undefined, lang: string | undefined) {
  const [chatDef, setChatDef] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const historyRef = useRef<Message[]>([]);

  useEffect(() => {
    let mounted = true;
    setMessages([]);
    setChatDef(null);
    if (cancerType && lang) {
      loadChatJson(cancerType, lang).then((def: any) => {
        if (!mounted) return;
        setChatDef(def);
        const start = def["q1"];
        if (start) pushBot(start);
      });
    }
    return () => {
      mounted = false;
    };
  }, [cancerType, lang]);

  function pushBot(node: any) {
    if (!node) return;
    setTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: node.id,
        from: "doctor",
        text: node.text,
        options: node.buttons
          ? node.buttons.map((b: any) => ({ text: b.text, next: b.next_node_id }))
          : [],
        image: node.image_url,
      };
      setMessages((m) => {
        const next = [...m, botMsg];
        historyRef.current.push(botMsg);
        saveHistory(historyRef.current);
        return next;
      });
      setTyping(false);
    }, 800);
  }

  function chooseOption(option: { text: string; next: string }) {
    const userMsg: Message = { id: `u_${Date.now()}`, from: "user", text: option.text };
    setMessages((m) => {
      const next = [...m, userMsg];
      historyRef.current.push(userMsg);
      saveHistory(historyRef.current);
      return next;
    });
    // find node by id
    const nextNode = chatDef[option.next];
    if (nextNode) pushBot(nextNode);
  }

  function goBack() {
    // simple back: pop last two messages (user + doctor) and replay last doctor if exists
    setMessages((m) => {
      const copy = [...m];
      // remove last user message if present
      for (let i = copy.length - 1; i >= 0; i--) {
        if (copy[i].from === "user") {
          copy.splice(i, 1);
          break;
        }
        copy.pop();
      }
      // remove trailing doctor messages until last is doctor
      while (copy.length && copy[copy.length - 1].from === "doctor") copy.pop();
      historyRef.current = copy;
      saveHistory(historyRef.current);
      return copy;
    });
  }

  function restart() {
    setMessages([]);
    historyRef.current = [];
    saveHistory(historyRef.current);
    const start = chatDef?.["q1"];
    pushBot(start);
  }

  return { messages, typing, chooseOption, goBack, restart };
}
