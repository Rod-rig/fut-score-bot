const scoreMap = {
  "0:0": "zeroZero",
  "1:1": "oneOne",
  "2:2": "twoTwo",
  "1:0": "oneZero",
  "2:0": "twoZero",
  "3:0": "threeZero",
  "2:1": "twoOne",
  "3:1": "threeOne",
  "3:2": "threeTwo",
  "0:1": "zeroOne",
  "0:2": "zeroTwo",
  "0:3": "zeroThree",
  "1:2": "oneTwo",
  "1:3": "oneThree",
  "2:3": "twoThree",
  anyOther: "anyOther",
};

const oneXTwoMap = {
  1: "one",
  X: "x",
  2: "two",
};

export const scoreMapping = (score) => {
  return scoreMap[score] ? scoreMap[score] : "anyOther";
};

export const oneXTwo = (score) => {
  return oneXTwoMap[score];
};
