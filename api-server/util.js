const findMin = (number1, number2) => {
  if (isNaN(number1) || isNaN(number2)) {
    return {
      message: "Please enter valid numbers",
      status: 400,
      data: null,
    };
  } else {
    return {
      data: number1 < number2 ? number1 : number2,
      message: "Minimum number found",
      status: 200,
    };
  }
};

const findMax = (number1, number2) => {
  if (isNaN(number1) || isNaN(number2)) {
    return {
      message: "Please enter valid numbers",
      status: 400,
      data: null,
    };
  } else {
    return {
      data: number1 > number2 ? number1 : number2,
      message: "Maximum number found",
      status: 200,
    };
  }
};

const findAvg = (numbers) => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (isNaN(numbers[i])) {
      return {
        message: "Please enter valid numbers",
        status: 400,
        data: null,
      };
    } else {
      sum += numbers[i];
    }
  }
  const avg = sum / numbers.length;
  return {
    data: `Average of given numbers is ${avg}`,
    message: "Avg found",
    status: 200,
  };
};

const findSort = (numbers, type) => {
  console.log(numbers);
  const len = numbers.length;
  const sortedNum = [...numbers];
  if (type === "asc") {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
        if (sortedNum[i] > sortedNum[i + 1]) {
          const temp = sortedNum[i];
          sortedNum[i] = sortedNum[i + 1];
          sortedNum[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    return {
      data: sortedNum,
      message: "Sorted numbers  ascending order",
      status: 200,
    };
  } else if (type === "desc") {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
        if (sortedNum[i] < sortedNum[i + 1]) {
          const temp = sortedNum[i];
          sortedNum[i] = sortedNum[i + 1];
          sortedNum[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    return {
      data: sortedNum,
      message: "Sorted numbers descending order",
      status: 200,
    };
  } else {
    return {
      message: "Please enter valid sort type",
      status: 400,
      data: null,
    };
  }
};

const countOccurance = (str, searchStr) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === searchStr) {
      count++;
    }
  }
  return {
    data: count,
    message: "Occurance found",
    status: 200,
  };
}
module.exports = { findMin, findMax, findAvg, findSort, countOccurance };
