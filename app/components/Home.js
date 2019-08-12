// @flow

import { remote } from 'electron';
import { Line } from 'rc-progress';
import React, { Component } from 'react';
import '../../node_modules/rc-progress/assets/index.css';
import config from '../config';
import { downloadFile } from '../utils/downloadfile';
import { readlocalFile, getupdatedFileList, getupdatedFileFolderList } from '../utils/readfile';
import styles from './Home.css';
import Fs from 'fs';
const startDefault = require('../assets/img/start-default.jpg');
const startDisabled = require('../assets/img/start-disabled.jpg');
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSrc: startDefault,
      counter: 0,
      totalCount: 0,
      updatePerc: 0,
      downloadPerc: 0,
      isDisabled: true,
      filename: ''
    }
  }
  componentDidMount() {

    this.downloadTextFile().then(async (latestdata) => {
      let fileList = getupdatedFileList(latestdata);
      let fileFolderList = getupdatedFileFolderList(latestdata);
      this.setState({ totalCount: (fileList.length + fileFolderList.length) });
      debugger;
      await fileList.reduce(async (promise, item) => {
        let fileObject = {
          filename: item,
          foldername: 'DownloadFiles'
        }
        await promise;
        this.setState({ updatePerc: 0 });
        await downloadFile(fileObject, () => {
          const counter = this.state.counter + 1;
          this.setState({ counter });
          this.setState({ updatePerc: 100, downloadPerc: Math.ceil(this.state.counter / this.state.totalCount * 100), isDisabled: counter !== this.state.totalCount })
        });
        this.setState({ filename: item });
      }, Promise.resolve());

      this.downloadFolderFiles(fileFolderList);
    });

  }
  downloadTextFile() {
    let fileObject = {
      foldername: 'DownloadFiles',
      filename: 'gc-apatch_file_info.txt',
    }
    return new Promise((resolve, reject) => {
      downloadFile(fileObject, async (file) => {
        resolve(readlocalFile(file.path));
      });
    })
  }
  async downloadFolderFiles(fileList) {
    await fileList.reduce(async (promise, item) => {
      let fileObject = {
        filename: item.filename,
        isfolderinclude: true,
        foldername: `DownloadFiles/${item.foldername}`
      }
      await promise;
      this.setState({ updatePerc: 0 });
      await downloadFile(fileObject, () => {
        const counter = this.state.counter + 1;
        this.setState({ counter });
        this.setState({ updatePerc: 100, downloadPerc: Math.ceil(this.state.counter / this.state.totalCount * 100), isDisabled: counter !== this.state.totalCount })
      });
      this.setState({ filename: item.filename });
    }, Promise.resolve());
  }
  closeClick = () => {
    remote.getCurrentWindow().close();
  }
  onStart = () => {

  }
  render() {
    console.log(this.state.updatePerc);
    return (
      <div>
        <div className={styles.closebtn} onClick={this.closeClick}>
        </div>

        <div className={styles.startbtn} onClick={this.onStart} disabled={this.state.isDisabled}>
          <img src={this.state.imgSrc} disabled={this.state.isDisabled} />
        </div>

        <div className={styles.iframe}>
          {/* <iframe src='https://ir.tools.investis.com/clients/(S(ci3fa5bsz3b2bvsbin54bnqn))/fi/tieto1/sm7/default.aspx?culture=en-US#' frameBorder="0"></iframe> */}
        </div>
        <div className={styles.downloadCaption}>
          <span>Downloading File : {this.state.filename}</span>
        </div>
        <div className={styles.prograss}>
          <Line percent={this.state.updatePerc} strokeWidth="3" strokeColor="#14409C" trailWidth="2" trailColor="#040404" />
        </div>
        <div className={styles.prograssupdate}>
          <Line percent={this.state.downloadPerc} strokeWidth="5" strokeLinecap="round" gapPosition="bottom" strokeColor="#0875F6" trailWidth="2" trailColor="#040404" />
        </div>
        <div className={styles.percentage}>
          <span>{this.state.downloadPerc}% </span>
        </div>
      </div >
    );
  }
}
