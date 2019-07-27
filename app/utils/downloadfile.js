export default async function downloadFile() {
  try {
    const url = fileobject.url; //'http://www.mediafire.com/file/fy09pa25sc3xsvr/bancapconfig.ini/file'
    let path;
    if (fileobject.foldername) {
      path = Path.join(rootPath, fileobject.foldername, fileobject.filename);
    } else {
      path = Path.join(rootPath, fileobject.filename);
    }
    const writer = Fs.createWriteStream(path)

    const response = await Axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  } catch (err) {
  }
}
