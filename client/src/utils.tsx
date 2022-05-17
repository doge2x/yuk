export function devLog(msg?: any, ...params: any[]) {
  if (DEV_MODE) {
    console.log(msg, ...params);
  }
}

export function newURL(
  url: string | URL,
  params?: { [s: string]: string }
): URL {
  const url2 = new URL(url, self.location.origin);
  for (const [k, v] of Object.entries(params ?? {})) {
    url2.searchParams.set(k, v);
  }
  return url2;
}
