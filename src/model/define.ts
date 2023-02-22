import * as tf from "@tensorflow/tfjs-node";

interface Options {
  name: string;
  inputShape: tf.Shape;
}

export function define({ inputShape, name }: Options) {
  const model = tf.sequential({
    name,
  });

  model.add(
    tf.layers.dense({
      inputShape,
      units: 12,
      activation: "relu",
      kernelRegularizer: tf.regularizers.l1({
        l1: 0.01,
      }),
    })
  );

  model.add(
    tf.layers.dense({
      units: 50,
      activation: "relu",
      kernelRegularizer: tf.regularizers.l1({
        l1: 0.01,
      }),
    })
  );

  model.add(
    tf.layers.dense({
      units: 100,
      activation: "relu",
      kernelRegularizer: tf.regularizers.l1({
        l1: 0.01,
      }),
    })
  );

  model.add(
    tf.layers.dense({
      units: 40,
      activation: "relu",
      kernelRegularizer: tf.regularizers.l1({
        l1: 0.01,
      }),
    })
  );

  model.add(
    tf.layers.dense({
      units: 25,
      activation: "relu",
      kernelRegularizer: tf.regularizers.l1({
        l1: 0.01,
      }),
    })
  );

  model.add(
    tf.layers.dense({
      units: 5,
      activation: "relu",
    })
  );

  model.add(
    tf.layers.dense({
      units: 1,
      activation: "linear",
    })
  );

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: "meanSquaredError",
  });

  return model;
}
