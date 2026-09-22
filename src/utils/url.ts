export function withBase(url: string): string {
  if (/^(?:[a-z]+:|#|\/\/)/i.test(url)) return url;

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${base}${path}` || "/";
}
