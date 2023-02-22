import * as tf from "@tensorflow/tfjs-node";
import consola from "consola";
import ProgressBar from "progress";

export async function fitDataset(
  model: tf.Sequential,
  dataset: tf.data.Dataset<tf.TensorContainer>,
  epochs: number
) {
  let loss: number | null = null;

  consola.restoreAll();
  const bar = new ProgressBar(
    "Training [:bar] :percent, loss: :loss, ETA: :etas",
    {
      complete: "=",
      incomplete: " ",
      width: 40,
      total: epochs,
    }
  );

  // Fit the model using the prepared Dataset
  await model.fitDataset(dataset, {
    epochs,
    verbose: 0,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        loss = logs?.loss ?? loss;

        bar.tick(1, {
          loss: (loss ?? 0).toFixed(4),
        });
      },
    },
  });

  consola.wrapAll();

  return {
    loss,
  };
}
