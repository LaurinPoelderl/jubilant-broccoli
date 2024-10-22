export { Model } from "./model";
export { store } from "./model";
// export const BASE_URL = "https://jsonplaceholder.typicode.com/";
export const BASE_URL = "/api";
export const IDENTITY = generateUUID();

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (char) {
      const random = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    }
  );
}
