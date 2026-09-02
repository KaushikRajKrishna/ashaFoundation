const PALETTE = ["bg-maroon", "bg-sage", "bg-dusk"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function MonogramAvatar({
  name,
  index = 0,
  initials: initialsOverride,
}: {
  name: string;
  index?: number;
  initials?: string;
}) {
  const color = PALETTE[index % PALETTE.length];
  return (
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-full ${color} font-display text-lg font-semibold text-cream shadow-sm`}
      aria-hidden="true"
    >
      {initialsOverride || initials(name)}
    </div>
  );
}
