"use client";

import Image from "next/image";
import { SendHorizontal } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { chatMessages } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";

type ChatTab = "chat" | "tippers";

export function LiveChatPanel() {
  const [activeTab, setActiveTab] = useState<ChatTab>("chat");
  const [messages, setMessages] = useState(chatMessages);
  const [message, setMessage] = useState("");
  const latestMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    latestMessageRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [messages, activeTab]);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        name: "You",
        handle: "viewer",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80",
        message: trimmedMessage,
        time: "now",
      },
    ]);
    setMessage("");
    setActiveTab("chat");
  }

  const topTippers = [
    { name: "0xA7B...3F2c", amount: "$250.00" },
    { name: "DeFiDegen", amount: "$110.00" },
    { name: "BuilderDAO", amount: "$85.00" },
    { name: "Web3Lover", amount: "$60.00" },
  ];

  return (
    <section className="glass-card flex min-h-[560px] flex-col rounded-2xl">
      <div className="grid grid-cols-2 border-b border-slate-200 px-5 pt-5">
        <button
          className={cn(
            "border-b-2 pb-4 text-left font-black transition",
            activeTab === "chat"
              ? "border-violet-600 text-violet-700"
              : "border-transparent text-slate-900 hover:text-violet-700",
          )}
          onClick={() => setActiveTab("chat")}
          type="button"
        >
          Live Chat
        </button>
        <button
          className={cn(
            "border-b-2 pb-4 text-left font-black transition",
            activeTab === "tippers"
              ? "border-violet-600 text-violet-700"
              : "border-transparent text-slate-900 hover:text-violet-700",
          )}
          onClick={() => setActiveTab("tippers")}
          type="button"
        >
          Top Tippers
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        {activeTab === "chat"
          ? messages.map((chatMessage, index) => (
              <article className="flex gap-3" key={chatMessage.id}>
                <Image
                  alt={chatMessage.name}
                  className="mt-1 size-8 rounded-full object-cover"
                  height={32}
                  src={chatMessage.avatar}
                  width={32}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {chatMessage.name}
                    </p>
                    <span className="text-xs font-medium text-slate-400">
                      {chatMessage.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-950">
                    {chatMessage.message}
                  </p>
                </div>
                {index === messages.length - 1 ? (
                  <div ref={latestMessageRef} />
                ) : null}
              </article>
            ))
          : topTippers.map((tipper, index) => (
              <article
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
                key={tipper.name}
              >
                <div>
                  <p className="text-sm font-black text-slate-950">
                    #{index + 1} {tipper.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Lifetime support</p>
                </div>
                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-black text-violet-700">
                  {tipper.amount}
                </span>
              </article>
            ))}
      </div>

      <form className="flex gap-3 border-t border-slate-200 p-4" onSubmit={submitMessage}>
        <input
          className="h-12 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
          disabled={activeTab !== "chat"}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Send a message..."
          value={message}
        />
        <button
          aria-label="Send message"
          className="grid size-12 place-items-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-500 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          disabled={activeTab !== "chat" || !message.trim()}
          type="submit"
        >
          <SendHorizontal className="size-5" />
        </button>
      </form>
    </section>
  );
}
