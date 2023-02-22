import * as tf from "@tensorflow/tfjs-node";

export async function loadFitSet(csvUrl: string, target: string) {
  const csvDataset = tf.data.csv(csvUrl, {
    columnConfigs: {
      [target]: {
        isLabel: true,
      },
    },
  });

  const featuresNumber = (await csvDataset.columnNames()).length - 1;

  const dataset = csvDataset
    .map((tensor: any) => {
      // Convert xs(features) and ys(labels) from object form (keyed by
      // column name) to array form.
      return { xs: Object.values(tensor.xs), ys: Object.values(tensor.ys) };
    })
    .batch(10);

  return {
    featuresNumber,
    dataset,
  };
}
