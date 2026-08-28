import site from "@/content/site.json";

/**
 * The red marker in our specific mapEmbedSrc renders at ~74%/49% of the
 * iframe (measured directly, not dead-center — Google's embed doesn't
 * guarantee exact centering) and that position holds steady across both the
 * square and 4:3 container shapes this is used in. This anchors the label
 * there so it reads as a callout pointing at the pin. It won't track the pin
 * if a visitor drags/zooms the embed themselves — it's a static CSS overlay,
 * not a real map layer. If mapEmbedSrc's location/zoom ever changes, re-measure.
 */
export default function MapLocationBadge() {
  return (
    <div className="pointer-events-none absolute top-[49%] left-[74%] z-10 flex -translate-x-1/2 -translate-y-[56px] flex-col items-center">
      <div className="rounded-xl bg-cream px-3.5 py-2 text-center whitespace-nowrap shadow-md ring-1 ring-ink/10">
        <p className="font-display text-xs leading-tight font-semibold text-ink">{site.brand.name}</p>
        <p className="text-[11px] leading-tight text-ink-soft">{site.contactInfo.shortLocation}</p>
      </div>
      <span className="-mt-1 h-2.5 w-2.5 rotate-45 rounded-[2px] bg-cream shadow-sm ring-1 ring-ink/10" />
    </div>
  );
}
