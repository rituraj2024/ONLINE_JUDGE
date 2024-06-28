const { executeCpp } = require("./executeCpp.js");
const { executePython } = require("./executePython.js");
const { executeJava } = require("./executeJava.js");
const { executeC } = require("./executeC.js");
const { executeJavaScript } = require("./executeJs.js");

const executeCode = async (language, filePath, inputPath) => {
  try {
    let output;
    if (language === "cpp") {
      output = await executeCpp(filePath, inputPath);
    } else if (language === "c") {
      output = await executeC(filePath, inputPath);
    } else if (language === "js") {
      output = await executeJavaScript(filePath, inputPath);
    } else if (language === "java") {
      output = await executeJava(filePath, inputPath);
    } else {
      output = await executePython(filePath, inputPath);
    }
    return output;
  } catch (error) {
    throw new Error(`Error executing ${language} code: ${error.message}`);
  }
};

module.exports = { executeCode };
