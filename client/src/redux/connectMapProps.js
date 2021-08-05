import * as authActions from "./modules/auth";
import * as userActions from "./modules/users";

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
export {mapStateToProps, mapDispatchToProps};