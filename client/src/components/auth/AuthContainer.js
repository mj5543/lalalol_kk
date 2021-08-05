import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../actions';
import InputContents from "../login/InputContents";
import * as authActions from "../../redux/modules/auth";
import * as userActions from "../../redux/modules/users";
import { withRouter } from "react-router-dom";
import storage from "../../storage";
import {isEmpty} from 'lodash';
import App from "../../App";

export class AuthContainer extends Component {
  componentDidMount() {
    this.checkUser();
    this.getIp();
  }

  checkUser = () => {
    console.log('AuthContainer props', this.props)
    if (!this.props.logged && !isEmpty(storage.get('loggedInfo'))) {
      this.props.setUserInfo(storage.get('loggedInfo'));
      this.props.history.push("/");
      return;
    }
    if (this.props.logged && !isEmpty(storage.get('loggedInfo'))) {
      this.props.history.push("/");
      return;
    }
  
    // 만약 userInfo값이 localStorage에 없을때에는, api통신을 실시.
    // checkUser();

    // 만약 checkUser가 실패 했다면, logged는 false로 바뀌므로, 로그인 페이지로 이동시킨다.
    // 또한, /auth/register에서는 /auth/login으로 이동할 필요가 없으므로, auth라는 path가 url에 포함될때는 제외시킨다
    if (!this.props.logged && !window.location.pathname.includes("auth")) {
      this.props.history.push("/auth/login");
    }
  };
  getIp = () => {
    if(isEmpty(this.props.ipInfo)) {
      this.props.getIpInfo();
    }
  }

  render() {
    return <div />;
  }
}
//*******connect 한 컴포넌트에서 props 로 내려 받을 수 있다.
const mapStateToProps = state => ({
  logged: state.users.logged,
  userInfo: state.users.userInfo,
  ipInfo: state.users.ipInfo
});

const mapDispatchToProps = dispatch => {
  return {
    // checkUser: () => {
    //   dispatch(authActions.checkUser());
    // },
    userCheck: (params) => {
      dispatch(userActions.actionCreators.getProvideUserCheck(params));
    },
    setUserInfo: (info) => {
      dispatch(userActions.actionCreators.setUserInfo(info));
    },
    getIpInfo: (info) => {
      dispatch(userActions.actionCreators.getIpInfo(info));
    },
    setUserTemp: ({ id, username }) => {
      dispatch(authActions.setUserTemp({ id, username }));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthContainer)
);
