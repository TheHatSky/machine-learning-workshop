import { define } from "./model/define";
import { fitDataset } from "./model/fitDataset";
import { loadSets } from "./model/loadSets";
import { print } from "./model/print";
import { save } from "./model/save";

export async function csv() {
  // We want to predict the column "medv", which represents a median value of
  // a home (in $1000s), so we mark it as a label.
  const {
    fitSet: { dataset, featuresNumber },
    controlSet: { expected: controlAnswers, tensor: controlTensor },
  } = await loadSets({
    folder: "example",
    target: "medv",
  });

  // Define the model.
  const model = define({
    name: "example",
    inputShape: [featuresNumber],
  });

  const epochs = 50;
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
