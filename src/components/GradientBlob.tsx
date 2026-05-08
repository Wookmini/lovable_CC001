export function GradientBlob() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-primary-glow/40 blur-3xl" />
      <div className="absolute top-40 -right-20 w-72 h-72 rounded-full bg-peach/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-secondary/60 blur-3xl" />
    </div>
  );
}
