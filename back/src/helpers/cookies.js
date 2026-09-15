// Reads one cookie from the Cookie header.
// Splitting the whole header on "=" breaks as soon as a second cookie is present.
export function getCookie(req, name) {
  const header = req.headers['cookie'];
  if (!header) return undefined;

  const prefix = `${name}=`;
  const cookie = header
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return cookie && cookie.slice(prefix.length);
}
