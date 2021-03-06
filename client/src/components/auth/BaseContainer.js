import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../actions';
import InputContents from "../login/InputContents";
import * as authActions from "../../redux/modules/auth";
import * as userActions from "../../redux/modules/users";
import { withRouter } from "react-router-dom";

export class BaseContainer extends Component {
 
  componentDidMount() {
    console.log('BaseContainer this.props', this.props)
    this.checkUser();
  }

  checkUser = () => {
    console.log('BaseContainer this.props', this.props)
    const { setUserTemp, history } = this.props;

    // 먼저 localStorage에 값이 저장되있는지 확인, userInfo값이 있다면, 로그인을 한것으로 인식하고,
    // 바로 setUserTemp를 실시.
    // 이를 하는 이유는 새로고침 했을시, state가 초기화 되어 logged값도 false로 바뀌는데, 새로고침 했을시
    // // 로그인을 유지하기 위함.
    console.log('localStorage.getItem("loggedInfo")--', localStorage.getItem("loggedInfo"));
    if (localStorage.getItem("loggedInfo")) {
      const userInfo = JSON.parse(localStorage.getItem("loggedInfo"));
      setUserTemp({
        id: userInfo.id,
        username: userInfo.username,
      });
      return;
    }

    // 만약 userInfo값이 localStorage에 없을때에는, api통신을 실시.
    // checkUser();

    // 만약 checkUser가 실패 했다면, logged는 false로 바뀌므로, 로그인 페이지로 이동시킨다.
    // 또한, /auth/register에서는 /auth/login으로 이동할 필요가 없으므로, auth라는 path가 url에 포함될때는 제외시킨다
    if (!this.props.logged && !window.location.pathname.includes("auth")) {
      // history.push("/auth/login");
    }
  };

  render() {
    return <div />;
  }
}
//*******connect 한 컴포넌트에서 props 로 내려 받을 수 있다.
const mapStateToProps = state => ({
  logged: state.users.logged,
  userInfo: state.users.userInfo,
  ipInfo: state.users.ipInfo,
  provideInfo: state.users.provideInfo
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
    setUserTemp: ({ id, username }) => {
      dispatch(authActions.setUserTemp({ id, username }));
    },
    setProvideInfo: (info) => {
			dispatch({type: 'SET_PROVIDE_USER_CHECK', info})
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InputContents)
);
// const mapStateToProps = (state) => ({
//   userInfo: state.userInfo
// });
  
//   /*
//   액션 생성 함수를 사용하여 액션을 생성하고,
//   해당 액션을 dispatch하는 함수를 만든 후, 이를 props로 연결
//   */
//   const mapDispatchToProps = (dispatch) => ({
//     setUserTemp: ({ id, username }) => {
//       dispatch(authActions.setUserTemp({ id, username }));
//     }
//     // setUserInfo: (info) => {
//     //   dispatch(authActions.setColor(info));
//     // }
//   });
// const BaseContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
//   )(InputContents);
  
  // export default BaseContainer;