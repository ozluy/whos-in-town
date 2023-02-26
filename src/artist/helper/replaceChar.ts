const replaceChar = (text: string) => {
  let newText = text.replace("/", "%252F");
  newText = newText.replace("?", "%253F");
  newText = newText.replace("*", "%252A");
  newText = newText.replace('"', "%27C");

  return newText;
};

export default replaceChar;
