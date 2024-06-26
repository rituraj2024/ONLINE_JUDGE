const express = require("express");
const app = express();
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp.js");
const { executePython } = require("./executePython.js");
const cors = require("cors");

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ online: "compiler" });
});

app.post("/run", async (req, res) => {
  //   const language = req.body.language;
  //   const code = req.body.code;

  const { language = "cpp", code } = req.body;
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code!" });
  }
  try {
    const filePath = await generateFile(language, code);
    // const output = await executeCpp(filePath);
    let output;
    if (language === "cpp") {
      output = await executeCpp(filePath);
    } else if (language == "java") {
      output = await executeJava(filePath);
    } else {
      output = await executePython(filePath);
    }

    res.json({ filePath, output });
  } catch (error) {
    //console.log("error is this", error.stderr);
    res.status(500).json({ error: error });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
