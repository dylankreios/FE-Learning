// let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

// console.log(regexp.test("An orignal string")); // true

let regex = /(?=(\w+))\1/;
console.log(regex.test("string")); // true
