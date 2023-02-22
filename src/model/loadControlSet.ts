import * as tf from "@tensorflow/tfjs-node";

export async function loadControlSet(csvUrl: string, target: string) {
  const csvDataset = tf.data.csv(csvUrl);

  const controlSet: number[] = [];
  const expected: number[] = [];

  const columnNames = await csvDataset.columnNames();
  const featuresNumber = columnNames.length - 1;

  const targetColumnIndex = columnNames.findIndex((c) => c == target);

  await csvDataset.forEachAsync((t) => {
    const row = Object.values(t!) as number[];

    const values = [
      ...row.slice(0, targetColumnIndex),
      ...row.slice(targetColumnIndex + 1),
    ];

    controlSet.push(...values);
    expected.push(row.at(targetColumnIndex)!);
  });

  return {
    controlSet,
    expected,
    tensor: tf.tensor2d(controlSet, [
      controlSet.length / featuresNumber,
      featuresNumber,
    ]),
  };
}
