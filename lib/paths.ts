// paths: small helpers to build correct URLs on GitHub Pages (basePath) and locally.

export function getBasePath() {
  // Why: GitHub Pages serves the site under `/<repo>/`, so assets must be prefixed.
  // Logic: use NEXT_PUBLIC_BASE_PATH when set (workflow sets it automatically).
  return (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
}

export function withBasePath(url: string) {
  const basePath = getBasePath();
  if (!basePath) return url;
  if (!url) return url;
  if (!url.startsWith("/")) return url;
  if (url === basePath || url.startsWith(`${basePath}/`)) return url;
  return `${basePath}${url}`;
}

