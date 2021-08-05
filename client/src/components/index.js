import { connect } from "react-redux";
import { actionCreators as usersActions } from "../redux/modules/users";
// import Container from "./container";
import UserCheck from "./login/UserCheck";
const mapStateToProps = (state, ownProps) => {
  const { users: { items } } = state;
  const { routing: { location } } = state;
  return {
    location: location.pathname,
    items
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUsers: () => {
      dispatch(usersActions.getProvideUserCheck());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCheck);