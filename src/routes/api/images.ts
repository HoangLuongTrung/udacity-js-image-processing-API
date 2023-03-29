import express from "express";
import {promises as fsPromises} from fs;
const path = require("path");
const teachers = express.Router();

teachers.get("/", async (req: any, res: any) => {
  const fileName = req.query.fileName;
  const width = req.query.width;
  const height = req.query.height;
  express.static("images");
  teachers.use(express.static("src"));
  const myFile = await fsPromises.writeFile('myfile.txt', 'add text');
  console.log(__filename );
  console.log(__dirname );
  // teachers.use("/images", express.static("images"));
  // teachers.use(express.static(__dirname + "'\'images"));
  
  // console.log(fileName);
  // console.log(width);
  // console.log(__dirname + "''images");
  // res.writeHead(200, { "Content-Type": "image/gif" });
  // res.send(`<img src=../../images/${fileName}.jpg>`)
  // res.send(`<img src="D:/Dev/Udacity/Javascript/image-processing/udacity-js-image-processing-API/../../images/${fileName}.jpg">`);
  res.send('a');
});

export default teachers;
