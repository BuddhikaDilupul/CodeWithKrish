const express = require("express");
const {
  findMin,
  findMax,
  findSort,
  findAvg,
  countOccurance,
} = require("./util");
const app = new express();
const port = 3000;

// API for Find minimum number 
app.get("/number/min", (req, res) => {
  const number1 = parseFloat(req.query.num1);
  const number2 = parseFloat(req.query.num2);

  const result = findMin(number1, number2);
  res
    .status(result.status)
    .json({ data: result.data, message: result.message });
});

// API for Find maximum number 
app.get("/number/max", (req, res) => {
  const number1 = parseFloat(req.query.num1);
  const number2 = parseFloat(req.query.num2);

  const result = findMax(number1, number2);
  res
    .status(result.status)
    .json({ data: result.data, message: result.message });
});

// API for Find sort number 
app.get("/number/sort", (req, res) => { 
  const number1 = (req.query.numbers.split(",").map(num=> parseFloat(num)));
  const type = req.query.type;

  const result = findSort(number1, type);
  res
  .status(result.status)
  .json({ data: result.data, message: result.message });
});

// API for Find average number
app.get("/number/avg", (req, res) => {
  const numbers = (req.query.numbers.split(",").map(num=> parseFloat(num)));

  const result = findAvg(numbers);
  res
    .status(result.status)
    .json({ data: result.data, message: result.message });
});

// API for geet count of occurance of a element in a given array
app.get("/number/count", (req, res) => {
  const arr = req.query.numbers.split(",").map((str) => str.toString());
  const search = req.query.search;

  const result = countOccurance(arr, search);
  res
    .status(result.status)
    .json({ data: result.data, message: result.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
