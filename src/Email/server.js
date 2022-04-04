import fs from "fs";
import path from "path";
import { generate } from "./generate";
import colors from "colors";
import { render } from "mjml-react";
import express from "express";
import querystring from "querystring";

const { EMAIL_PORT = 3001 } = process.env;

const app = express();

const filePath = path.join(__dirname, "generatedEmail.html");

const { html } = render(generate(), { validationLevel: "soft" });

let oldFile;

try {
  oldFile = fs.readFileSync(filePath, { encoding: "utf-8", flag: "r" });
} catch (e) {}

if (oldFile !== html) {
  try {
    fs.writeFileSync(filePath, html);
    console.log("Successfully saved html file to".green, `${filePath}`.white);
    console.log("");
    console.log("You should commit the new html file to the repo.".magenta);
    console.log("");
  } catch ({ message }) {
    throw new Error(`Email generation failed: ${message}`);
  }
} else {
  console.log("Email generation skipped: File content unchanged.".yellow);
}

app.get("*", (req, res) => {
  res.send(html.replaceAll("%%var%%", req.query.var));
});

app.listen(EMAIL_PORT, () =>
  console.log(`Server started on port ${EMAIL_PORT}`)
);
