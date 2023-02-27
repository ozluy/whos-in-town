const charMap: { [k: string]: string } = {
  "/": "%252F",
  "?": "%253F",
  "*": "%252A",
  '"': "%27C",
};

const replaceChar = (text: string) => {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charToReplace = charMap[char];
    if (charToReplace) {
      newText += charToReplace;
    } else {
      newText += char;
    }
  }

  return newText;
};

export default replaceChar;
