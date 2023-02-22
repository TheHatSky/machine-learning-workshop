import * as tf from "@tensorflow/tfjs-node";
import { mkdir } from "fs/promises";

const defaultTag = `${new Date()
  .toISOString()
  .replace("T", "_")
  .replaceAll(":", "-")}`;

export async function save(model: tf.Sequential, tag = defaultTag) {
  const folderName = `./models/${model.name}_${tag}`;

  await mkdir(folderName, {
    recursive: true,
  });

  await model.save(`file://${__dirname}/../../${folderName}`);

  return {
    location: folderName,
  };
}
