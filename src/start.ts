import Yargs from "yargs";
import "./initialize";

console.log("\n\n");

Yargs.scriptName("workshop")
  .usage("$0 <cmd> [args]")
  .command(
    "csv [set] [target] [epochs]",
    "fit model from fit.csv set and predict against control.csv",
    (yargs) => {
      yargs.positional("set", {
        type: "string",
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

      await csv({
        set: argv["set"] as string,
        target: argv["target"] as string,
        epochs: argv["epochs"] as number | undefined,
      });
    }
  )
  .help().argv;
