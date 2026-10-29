export function BrandLogo() {
  return (
    <a
      href="/"
      aria-label="NYAUTSA SS Trading and Projects home"
      className="inline-flex shrink-0 items-center gap-3"
    >
      <svg
        viewBox="0 0 100 100"
        className="h-14 w-14 shrink-0 sm:h-16 sm:w-16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="46" stroke="#183c30" strokeWidth="3" />
        <circle cx="50" cy="36" r="13" stroke="#c49b35" strokeWidth="3" />
        <path
          d="M21 58 50 32 79 58H21Z"
          stroke="#183c30"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M28 59V79H72V59M17 80H83"
          stroke="#183c30"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>

      <span className="flex flex-col">
        <span className="font-serif text-[22px] font-bold leading-tight tracking-[0.04em] text-[#183c30] sm:text-[26px]">
          NYAUTSA
        </span>
        <span className="my-2 h-px w-8 bg-[#c49b35]" />
        <span className="text-[9px] font-medium leading-tight tracking-[0.12em] text-[#57584c] sm:text-[10px]">
          SS TRADING &amp; PROJECTS
        </span>
      </span>
    </a>
  );
}