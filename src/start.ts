import "./initialize";

import { simple } from "./simple";
import { csv } from "./csv";

console.log("\n\n");

const commands = {
  csv,
  simple,
};

async function run() {
  const command = process.argv[2] as keyof typeof commands;
  await commands[command ?? "csv"]();
}

run();
