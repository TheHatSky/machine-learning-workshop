import { loadControlSet } from "./loadControlSet";
import { loadFitSet } from "./loadFitSet";

interface Options {
  folder: string;
  target: string;
}

export async function loadSets({ folder, target }: Options) {
  const csvUrl = `file://${__dirname}/../../data/${folder}/fit.csv`;
  const csvControlUrl = `file://${__dirname}/../../data/${folder}/control.csv`;

  const [fitSet, controlSet] = await Promise.all([
    loadFitSet(csvUrl, target),
    loadControlSet(csvControlUrl, target),
  ]);

  return {
    fitSet,
    controlSet,
  };
}
