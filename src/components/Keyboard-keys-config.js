const keysLineOne = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysLineTwo = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysLineTree = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "DEL"];

const allKeys = Array.from([...keysLineOne, ...keysLineTwo, ...keysLineTree]);

export const keyConfig = allKeys.map((k) => {
  return {
    name: k,
    state: "",
  };
});
