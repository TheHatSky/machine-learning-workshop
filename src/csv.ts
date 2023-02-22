import { define } from "./model/define";
import { fitDataset } from "./model/fitDataset";
import { loadSets } from "./model/loadSets";
import { print } from "./model/print";
import { save } from "./model/save";

interface Options {
  set: string;
  target: string;
  epochs?: number;
}

console.log("\n\n");

export async function csv(options: Options) {
  // We want to predict the column "medv", which represents a median value of
  // a home (in $1000s), so we mark it as a label.
  const {
    fitSet: { dataset, featuresNumber },
    controlSet: { expected: controlAnswers, tensor: controlTensor },
  } = await loadSets({
    folder: options.set,
    target: options.target,
  });

  // Define the model.
  const model = define({
    name: options.set,
    inputShape: [featuresNumber],
  });

  const epochs = options.epochs ?? 50;
  const { loss } = await fitDataset(model, dataset, epochs);

  const { location } = await save(model);

  model.summary();

  const prediction = model.predict(controlTensor);

  print({
    prediction,
    controlAnswers,
    epochs,
    location,
    loss,
  });
}
