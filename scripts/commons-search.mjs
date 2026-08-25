// Dev-only helper (not part of the app) to search Wikimedia Commons for
// freely-licensed stock photography. Usage:
//   node scripts/commons-search.mjs "search query" [limit]
import https from "node:https";

const query = process.argv[2];
const limit = Number(process.argv[3] ?? 8);

if (!query) {
  console.error("Usage: node scripts/commons-search.mjs \"search query\" [limit]");
  process.exit(1);
}

const params = new URLSearchParams({
  action: "query",
  format: "json",
  generator: "search",
  gsrsearch: `${query} filetype:bitmap`,
  gsrnamespace: "6",
  gsrlimit: String(limit),
  prop: "imageinfo",
  iiprop: "url|extmetadata|mime|size",
  iiurlwidth: "1600",
});

const url = `https://commons.wikimedia.org/w/api.php?${params.toString()}`;

https.get(
  url,
  { headers: { "User-Agent": "AshaFoundationSiteBuild/1.0 (contact: brandradiator2@gmail.com)" } },
  (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      const json = JSON.parse(data);
      const pages = Object.values(json.query?.pages ?? {});
      const results = pages
        .map((page) => {
          const ii = (page.imageinfo || [])[0];
          if (!ii) return null;
          const meta = ii.extmetadata || {};
          return {
            title: page.title,
            mime: ii.mime,
            width: ii.width,
            height: ii.height,
            license: meta.LicenseShortName?.value,
            artist: (meta.Artist?.value ?? "").replace(/<[^>]+>/g, "").trim(),
            attributionRequired: meta.AttributionRequired?.value,
            thumburl: ii.thumburl || ii.url,
            fullUrl: ii.url,
            descriptionUrl: ii.descriptionurl,
          };
        })
        .filter((r) => r && r.mime?.startsWith("image/") && r.width >= 1000)
        .sort((a, b) => b.width * b.height - a.width * a.height);

      console.log(`\nQuery: "${query}" — ${results.length} candidate(s)\n`);
      results.forEach((r, i) => {
        console.log(
          `[${i}] ${r.title}\n    ${r.width}x${r.height} | ${r.license} | artist: ${r.artist || "unknown"}\n    ${r.thumburl}\n`
        );
      });
    });
  }
).on("error", (err) => {
  console.error(err);
  process.exit(1);
});
