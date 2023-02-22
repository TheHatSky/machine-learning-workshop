import * as tf from "@tensorflow/tfjs-node";

interface Options {
  prediction: tf.Tensor<tf.Rank> | tf.Tensor<tf.Rank>[];
  controlAnswers: number[];
  epochs: number;
  loss: number | null;
  location: string;
}

export function print({
  prediction,
  controlAnswers,
  epochs,
  loss,
  location,
}: Options) {
  if (!Array.isArray(prediction)) {
    const results: number[] = [];

    prediction.dataSync().forEach((p) => results.push(p));

    const table = results.map((prediction, i) => {
      const actual = controlAnswers[i];
      const error = Math.abs(1 - actual / prediction) * 100;

      return {
        Actual: actual,
        Prediction: prediction,
        Error: `${error.toPrecision(2)} %`,
      };
    });

    console.log("\n\n");
    console.info("Model parameters:");
    console.table({
      Epochs: epochs,
      Loss: loss,
      Location: location,
    });

    console.log("\n\n");
    console.success("Results:");
    console.table(table);
  }
}
