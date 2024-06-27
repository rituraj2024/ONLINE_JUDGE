const { exec } = require("child_process");

const executeJava = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(`java ${filepath}`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

module.exports = {
  executeJava,
};
