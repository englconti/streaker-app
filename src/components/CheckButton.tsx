"use client";

export default function CheckButton({
  done,
  label,
  onClick,
}: {
  done: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={done}
      aria-label={label}
      className={`flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors ${
        done
          ? "border-accent bg-accent text-white"
          : "border-line bg-transparent text-transparent hover:border-accent hover:text-accent"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-6">
        <path
          d="M5 12.5 10 17.5 19 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
