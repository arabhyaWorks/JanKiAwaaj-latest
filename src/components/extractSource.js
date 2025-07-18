export function extractSource(url) {
  try {
    const domain = new URL(url).hostname;
    if (domain.includes("timesofindia")) return "Times of India";
    if (domain.includes("amarujala")) return "अमर उजाला";
    if (domain.includes("hindustantimes")) return "Hindustan Times";
    if (domain.includes("ndtv")) return "NDTV";
    if (domain.includes("indiatoday")) return "India Today";

    return domain.replace("www.", "").split(".")[0].replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  } catch {
    return "Unknown Source";
  }
}
