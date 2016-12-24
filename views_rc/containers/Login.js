import React, { Component,propTypes } from 'react';
import { Link,browserHistory} from 'react-router';
import axios from 'axios';
export default class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        message:"",
        email:"",
        password:""
      }
  }
  componentDidMount() {

  }
  submitBtn(e){
    axios.post(`/api/login/`,{
      password: this.state.password,
      email: this.state.email,
    }).then((json)=>{
      json = json.data;
      if(json.code === 0){
        browserHistory.push('/');
      }else{
        this.setState({
          message:json.message
        })
      }
    })
    .catch((error)=>{
      console.log('request failed', error);
    });
  }

  _handleClick = (e) =>{
    this.submitBtn()
  }

  changePasswordVal = (e) =>{
    var val = e.target.value;
    this.setState({
      password:val
    })
  }

  render() {
    return (
      <div>
        <table>
        <tbody>
        <tr>
          <td>
            <div className="login_form">
              <input onChange={this.changePasswordVal} defaultValue="" placeholder="请输入密码" className="text" type="password"/>
              <div className="btn">
                <input className="btn" onClick={this._handleClick} value="登录" type="button" />
              </div>
            </div>
            <p>{this.state.message}</p>
          </td>
        </tr>
        </tbody>
        </table>
      </div>
    );
  }
};
