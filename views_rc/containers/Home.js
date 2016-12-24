import React, { Component,propTypes } from 'react';
import { Link } from 'react-router';
export default class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <table>
        <tbody>
        <tr>
          <td>
            <div>首页</div>
          </td>
        </tr>
        </tbody>
        </table>
      </div>
    );
  }
};
