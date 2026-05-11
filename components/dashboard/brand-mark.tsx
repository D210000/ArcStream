export function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-10">
        <div className="absolute inset-x-1 bottom-0 h-8 rotate-[28deg] rounded-full bg-gradient-to-t from-violet-600 to-sky-400 shadow-lg shadow-violet-500/20" />
        <div className="absolute inset-x-3 bottom-0 h-9 -rotate-[28deg] rounded-full bg-gradient-to-t from-fuchsia-500 to-cyan-300 shadow-lg shadow-cyan-400/20" />
        <div className="absolute bottom-0 left-4 size-3 rounded-full bg-white" />
      </div>
      <span className="text-2xl font-black tracking-normal text-slate-950">
        ArcStream
      </span>
    </div>
  );
}
