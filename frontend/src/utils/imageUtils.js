import { images } from "../assets/images.js";

export function resolveImage(name) {
  return images[name] || "";
}
