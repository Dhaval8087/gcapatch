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
  latestFileData.files.forEach(item => {
    let newdate = new Date(item.modifieddate);
    let getlatestrecord = localFileData.files.find(p => p.name === item.name);
    if (getlatestrecord) {
      let olddate = new Date(localFileData.modifieddate);
      if (newdate > olddate) {
        updatedfiles.push(getlatestrecord.name);
      }
    } else {
      updatedfiles.push(getlatestrecord.name);
    }

  });
  return updatedfiles;
}
export function getupdatedFileFolderList(latestFileData) {
  let updatedfiles = [];
  let path = Path.join(rootPath, 'app/utils', 'gc-apatch_file_info.txt');
  let localFileData = readlocalFile(path).folders;
  latestFileData.folders.forEach(item => {
    processFileFolder(item, localFileData, updatedfiles)
  });
  return updatedfiles;
}

function processFileFolder(latestItem, localFileData, updatedfiles) {
  if (latestItem.issubfolders == "true") {

  } else {
    latestItem.files.forEach(file => {
      let oldfolder = localFileData.filter(p => p.name === latestItem.name);
      if (oldfolder) {
        let oldItem = oldfolder[0].files.filter(q => q.name === file.name)[0];
        let newdate = new Date(file.modifieddate);
        if (oldItem) {
          let olddate = new Date(oldItem.modifieddate);
          if (newdate > olddate) {
            updatedfiles.push({ filename: `${latestItem.name}/${file.name}`, foldername: latestItem.name });
          }
        } else {
          updatedfiles.push({ filename: `${latestItem.name}/${file.name}`, foldername: latestItem.name });
        }
      } else {
      }

    })
  }
}
