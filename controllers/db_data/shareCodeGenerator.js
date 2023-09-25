function shareCodeGenerator() {
  let numChars = Math.floor(Math.random() * 5);
  let charChars = 4 - numChars;
  let code = "";

  while (numChars + charChars !== 4) {
    numChars = Math.floor(Math.random() * 5);
    charChars -= 4 - numChars;
  }

  for (let i = 0; i < numChars; i++) {
    let randomNum = Math.floor(Math.random() * 10);
    code += randomNum.toString();
  }
  for (let i = 0; i < charChars; i++) {
    let randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    code += randomChar;
  }

  return code;
}

module.exports = shareCodeGenerator;
