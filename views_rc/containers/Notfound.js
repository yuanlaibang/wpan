import React, { Component,propTypes } from 'react';

export default class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        wcj:"ok"
      }
  }
  render() {
    return (
      <div style={{height:"100%",backgroundColor:"#e8e8e8"}}>
        <div style={{textAlign:"center",paddingTop:"120px",fontSize:"21px",minHeight:"300px"}}>  ╯﹏╰ &nbsp; Not Found! 页面未找到！ </div>
      </div>
    );
  }
};


var container = {
  height:"100%"
}