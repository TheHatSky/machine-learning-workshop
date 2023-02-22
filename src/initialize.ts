import consola from "consola";

declare global {
  interface Console {
    success: typeof consola.success;
  }
}

consola.wrapAll();

console.success = consola.success;
