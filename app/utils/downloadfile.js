
import Fs from 'fs';
import { rootPath } from 'electron-root-path';
import Axios from 'axios';
import Path from 'path';
import config from '../config';
export async function downloadFile(fileobject, callback) {
  try {
    const url = `${config.URL}/${fileobject.filename}/file`;//fileobject.url; //'http://www.mediafire.com/file/fy09pa25sc3xsvr/bancapconfig.ini/file'
    let path;

    if (fileobject.foldername) {
      path = Path.join(rootPath, fileobject.foldername, fileobject.filename);

    } else {
      path = Path.join(rootPath, fileobject.filename);
    }
    if (fileobject.isfolderinclude) {
      let folderPath = Path.join(rootPath, fileobject.foldername);
      if (!Fs.existsSync(folderPath)) {
        Fs.mkdirSync(folderPath);
      }
      let filename = fileobject.filename.split('/');
      path = `${folderPath}/${filename[filename.length - 1]}`
    }
    const writer = Fs.createWriteStream(path, { autoClose: true, flags: 'w' });
    const response = await Axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    response.data.pipe(writer);
    writer.on('finish', () => {
      if (callback) {
        callback(writer)
      }
    });

  } catch (err) {
    console.log(err);
  }
}
export function showProgress(received, total) {
  return (received * 100) / total;
}
