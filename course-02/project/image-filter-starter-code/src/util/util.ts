import fs from "fs";
import { url } from "inspector";
import Jimp = require("jimp");
import  {spawn} from 'child_process';
// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath:string ="/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}
//validate Url
//helper function to validate Url
export async function validUrl(inputURL:string) {
  try {
    return Boolean(new URL(inputURL));
  } catch (err) {
    return false;
  }
}
// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}

//python process
const pythonProcess = spawn('python3',["scr/image_filter.py"]);
if(pythonProcess !==undefined){
  pythonProcess.stdout.on('data',(data)=>{
    console.log(data.toString());
    
  })
}
