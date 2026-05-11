import Image from "next/image";
import { SendHorizontal } from "lucide-react";

import { chatMessages } from "@/lib/dashboard/mock-data";

export function LiveChatPanel() {
  return (
    <section className="glass-card flex min-h-[560px] flex-col rounded-2xl">
      <div className="grid grid-cols-2 border-b border-slate-200 px-5 pt-5">
        <button
          className="border-b-2 border-violet-600 pb-4 text-left font-black text-violet-700"
          type="button"
        >
          Live Chat
        </button>
        <button
          className="pb-4 text-left font-black text-slate-900 transition hover:text-violet-700"
          type="button"
        >
          Top Tippers
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-5">
        {chatMessages.map((message) => (
          <article className="flex gap-3" key={message.id}>
            <Image
              alt={message.name}
              className="mt-1 size-8 rounded-full object-cover"
              height={32}
              src={message.avatar}
              width={32}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-bold text-slate-800">
                  {message.name}
                </p>
                <span className="text-xs font-medium text-slate-400">
                  {message.time}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-950">
                {message.message}
              </p>
            </div>
          </article>
        ))}
      </div>

      <form className="flex gap-3 border-t border-slate-200 p-4">
        <input
          className="h-12 min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
          placeholder="Send a message..."
        />
        <button
          aria-label="Send message"
          className="grid size-12 place-items-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-500"
          type="button"
        >
          <SendHorizontal className="size-5" />
        </button>
      </form>
    </section>
  );
}
