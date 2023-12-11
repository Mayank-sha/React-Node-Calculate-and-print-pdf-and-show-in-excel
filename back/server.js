// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const excel = require("exceljs");
const puppeteer = require("puppeteer");

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

let result = 0;

app.post("/calculate", (req, res) => {
  const { number1, number2 } = req.body;
  result = number1 + number2;

  // Write to Excel
  const workbook = new excel.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");
  worksheet.addRow(["Number 1", "Number 2", "Result"]);
  worksheet.addRow([number1, number2, result]);

  workbook.xlsx.writeFile("result.xlsx").then(() => {
    console.log("Excel file written successfully.");
  });

  res.json({ result });
});

app.get("/getResult", (req, res) => {
  res.json({ result });
});

app.get("/print", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/getResult", {
    waitUntil: "domcontentloaded",
  });

  await page.pdf({ path: "result.pdf", format: "A4" });

  await browser.close();

  res.sendFile("result.pdf", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
