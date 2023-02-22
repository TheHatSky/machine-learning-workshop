import * as tf from "@tensorflow/tfjs-node";

export async function simple() {
  // Create a simple model.
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  // Prepare the model for training: Specify the loss and the optimizer.
  model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

  // Generate some synthetic data for training. (y = 2x - 1)
  const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4, 22], [7, 1]);
  const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7, 43], [7, 1]);

  console.info("Start training");

  // Train the model using the data.
  await model.fit(xs, ys, { epochs: 250, verbose: 0 });

  console.info("finished training");

  const prediction = model.predict(tf.tensor2d([20], [1, 1]));

  const result = Array.isArray(prediction) ? prediction[0] : prediction;

  console.success("Result", result.dataSync());
}
