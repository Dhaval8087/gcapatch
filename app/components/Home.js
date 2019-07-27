// @flow
import '../../node_modules/rc-progress/assets/index.css';

import { remote } from 'electron';
import { Line } from 'rc-progress';
import React, { Component } from 'react';
import Path from 'path';
import styles from './Home.css';
import Axios from 'axios';
import Fs from 'fs';
import { rootPath } from 'electron-root-path';
const startDefault = require('../assets/img/start-default.jpg');
const startDisabled = require('../assets/img/start-disabled.jpg');
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgSrc: startDefault,
      updatePerc: 0,
      downloadPerc: 50,
      isDisabled: false
    }
  }
  componentDidMount() {
    // this.downloadImage().then(res=>{

    //   console.log(res);
    // })
  }
  closeClick = () => {
    remote.getCurrentWindow().close();
  }
  onStart = () => {
    if (this.state.isDisabled === false) {
      //alert('hi');
      this.setState({
        imgSrc: startDisabled,
        isDisabled: true
      })
      // const intervalId = setInterval(() => {
      //   this.setState({ downloadPerc: this.state.downloadPerc + 10 })
      //   if (this.state.downloadPerc === 100) {
      //     clearInterval(intervalId);
      //     this.setState({
      //       imgSrc: startDefault,
      //       isDisabled: false,
      //       updatePerc: 0,
      //       downloadPerc: 0
      //     })
      //   }
      // }, 500);
    }

  }
  render() {
    return (
      <div>
        <div className={styles.closebtn} onClick={this.closeClick}>
        </div>

        <div className={styles.startbtn} onClick={this.onStart} disabled={this.state.isDisabled}>
          <img src={this.state.imgSrc} disabled={this.state.isDisabled} />
        </div>

        <div className={styles.iframe}>
          <iframe src='https://ir.tools.investis.com/clients/(S(ci3fa5bsz3b2bvsbin54bnqn))/fi/tieto1/sm7/default.aspx?culture=en-US#' frameBorder="0"></iframe>
        </div>
        <div className={styles.downloadCaption}>
          <span>Downloading File </span>
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
      </div>
    );
  }
}
