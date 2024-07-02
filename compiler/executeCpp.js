const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.out < ${inputPath}`,
      (error, stdout, stderr) => {
        // if (error) {
        //   console.error("Compilation error1:", error);
        //   reject({ error, stderr });
        // }
        // if (stderr) {
        //   //console.error("Compilation stderr:", stderr);
        //   reject({ error: "Compilation error2", stderr });
        // }
        // resolve(stdout);
        if (error) {
          //console.error("Compilation error:", error);
          reject(new Error(`Compilation error: ${error.message}`));
        } else if (stderr) {
          // console.error("Runtime Error:", stderr);
          reject(new Error(`Runtime error: ${stderr}`));
        } else {
          resolve(stdout);
        }
      }
    );
  });
};

module.exports = {
  executeCpp,
};
