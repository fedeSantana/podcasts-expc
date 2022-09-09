const parser = new DOMParser();

export function xmlParse(text) {
  return parser.parseFromString(text, "text/xml");
}

export function htmlParse(text) {
  return parser.parseFromString(text, "text/html");
}
