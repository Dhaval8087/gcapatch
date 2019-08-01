import Fs from 'fs';
import { rootPath } from 'electron-root-path';
import Path from 'path';
export function readlocalFile(path) {
  let data = Fs.readFileSync(path);
  return JSON.parse(data.toString());
}
export function getupdatedFileList(latestFileData) {
  let updatedfiles = [];
  let path = Path.join(rootPath, 'app/utils', 'gc-apatch_file_info.txt');
  let localFileData = readlocalFile(path);
   localFileData.files.forEach(item=>{
     let olddate = new Date(item.modifieddate);
     let getlatestrecord = latestFileData.files.find(p=>p.name === item.name);
     let newdate = new Date(getlatestrecord.modifieddate);
     if(newdate > olddate) {
      updatedfiles.push(getlatestrecord.name);
     }
   });
   return updatedfiles;
}
