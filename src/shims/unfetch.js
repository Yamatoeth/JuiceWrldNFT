// Lightweight unfetch shim that forwards to native fetch in the browser
export default function unfetch(url, opts) {
  return fetch(url, opts);
}
