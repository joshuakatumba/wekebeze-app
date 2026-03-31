const KEY = "awareness_hub_history";
export function saveHistory(history) {
  try {
    localStorage.setItem(KEY, JSON.stringify(history));
  } catch (e) {}
}
export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch (e) {
    return null;
  }
}
export function clearHistory() {
  localStorage.removeItem(KEY);
}
