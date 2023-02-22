import Yargs from "yargs";
import "./initialize";

console.log("\n\n");

Yargs.command(
  "$0 [set] [target] [epochs]",
  "fit model from fit.csv set and predict against control.csv",
  (yargs) => {
    yargs.positional("set", {
      type: "string",
      demandOption: true,
      default: "example",
      describe: "name of the set folder in ./data/<set> folder",
    });
    yargs.positional("target", {
      type: "string",
      default: "medv",
      describe: "target column name",
    });
    yargs.positional("epochs", {
      type: "number",
      default: 50,
      describe: "amount of epochs for fitting",
    });
  },
  async function (argv) {
    const { csv } = await import("./csv");

    const set = argv["set"] as string;
    const target = argv["target"] as string;
    const epochs = argv["epochs"] as number | undefined;

    console.info(
      `Running fitting against "${set}" set, "${target}" target, with ${epochs} epochs.`
    );

    console.log("\n\n");

    await csv({
      set,
      target,
      epochs,
    });
  }
).help().argv;
