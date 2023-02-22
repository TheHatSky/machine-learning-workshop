# ML workshop

A minimalistic tensorflow-js machine learning workshop

## Installation

Install packages

```sh
pnpm i
```

## Command-line interface

Run training and control via `pnpm start`

```sh
pnpm start [set] [target] [epochs]

fit model from fit.csv set and predict against control.csv

Positionals:
  set     name of the set folder in ./data/<set> folder    [string] [default: "example"]
  target  target column name                               [string] [default: "medv"]
  epochs  amount of epochs for fitting                     [number] [default: 50]

Options:
  --version  Show version number                           [boolean]
  --help     Show help                                     [boolean]
```
