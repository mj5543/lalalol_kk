import React, {useEffect} from 'react';
import { connect } from "react-redux";
import * as authActions from "../../redux/modules/auth";
import * as userActions from "../../redux/modules/users";
import { withRouter } from "react-router-dom";
import storage from "../lib/storage";
import {isEmpty} from 'lodash';

const NavbarExpandTop = (props) => {
  console.log('NavbarExpandTop props', props);
  let LogButtonText = '';
  let buttonEl = <div></div>;
  let signupEl = '';
  const defaultImage = {
    backgroundImage: `url("data:image/svg+xml;charset=utf8,{<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-file-person-fill' viewBox='0 0 16 16'>
    <path d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z'></path>
  </svg>}")`
  }
  const goLogin = () => {
    props.history.push('/auth/login');
  }
  const goSignUp = () => {
    props.history.push('/auth/sign-up');
  }
  const doLogout = () => {
    props.logout()
    props.history.push('/');
  }
  if(!props.logged) {
    signupEl = <div>
        <div className="dropdown-divider"></div><a className="dropdown-item" onClick={goSignUp}>Sign up</a>
      </div>
    LogButtonText = 'Sign in';
    buttonEl = <a className="dropdown-item" onClick={goLogin}>{LogButtonText}</a>
  } else {
    LogButtonText = 'LOGOUT';
    buttonEl = <a className="dropdown-item" onClick={doLogout}>{LogButtonText}</a>
  }
  const setUserIcon = () => {
    let userIcon = '';
    if(props.logged) {
      if(isEmpty(props.userInfo.app_image_url)) {
        userIcon = <div className="bi-person top-50 start-0" style={{width: '40px', height: '40px'}}></div>
      } else {
        userIcon = <img src={props.userInfo.app_image_url} className="avatar img-fluid rounded me-1" alt="" />;
      }
    } else {
      userIcon = <div className="bi-person-x top-50 start-0" style={{width: '40px', height: '40px'}}></div>
    }
    return userIcon;
  }
  useEffect(() => {
    console.log('useEffect', props.logged);

	}, [props.logged])
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
    <a className="sidebar-toggle js-sidebar-toggle">
      <i className="hamburger align-self-center"></i>
    </a>

    <div className="navbar-collapse collapse">
      <ul className="navbar-nav navbar-align">
        {/* <li className="nav-item dropdown">
          <a className="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-bs-toggle="dropdown">
            <div className="position-relative">
              <i className="align-middle" data-feather="bell"></i>
              <span className="indicator">4</span>
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
            <div className="dropdown-menu-header">
              4 New Notifications
            </div>
            <div className="list-group">
              <a href="#" className="list-group-item">
                <div className="row g-0 align-items-center">
                  <div className="col-2">
                    <i className="text-danger" data-feather="alert-circle"></i>
                  </div>
                  <div className="col-10">
                    <div className="text-dark">Update completed</div>
                    <div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
                    <div className="text-muted small mt-1">30m ago</div>
                  </div>
                </div>
              </a>
              <a href="#" className="list-group-item">
                <div className="row g-0 align-items-center">
                  <div className="col-2">
                    <i className="text-warning" data-feather="bell"></i>
                  </div>
                  <div className="col-10">
                    <div className="text-dark">Lorem ipsum</div>
                    <div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
                    <div className="text-muted small mt-1">2h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" className="list-group-item">
                <div className="row g-0 align-items-center">
                  <div className="col-2">
                    <i className="text-primary" data-feather="home"></i>
                  </div>
                  <div className="col-10">
                    <div className="text-dark">Login from 192.186.1.8</div>
                    <div className="text-muted small mt-1">5h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" className="list-group-item">
                <div className="row g-0 align-items-center">
                  <div className="col-2">
                    <i className="text-success" data-feather="user-plus"></i>
                  </div>
                  <div className="col-10">
                    <div className="text-dark">New connection</div>
                    <div className="text-muted small mt-1">Christina accepted your request.</div>
                    <div className="text-muted small mt-1">14h ago</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="dropdown-menu-footer">
              <a href="#" className="text-muted">Show all notifications</a>
            </div>
          </div>
        </li> */}
        {/* <li className="nav-item dropdown">
          <a className="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown">
            <div className="position-relative">
              <i className="align-middle" data-feather="message-square"></i>
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
            <div className="dropdown-menu-header">
              <div className="position-relative">
                4 New Messages
              </div>
            </div>
            <div className="list-group">
              <a href="#" className="list-group-item">
                <div className="row g-0 align-items-center">
                  <div className="col-2">
                    <img src="img/avatars/avatar-5.jpg" className="avatar img-fluid rounded-circle" alt="Vanessa Tucker" />
                  </div>
                  <div className="col-10 ps-2">
                    <div className="text-dark">Vanessa Tucker</div>
                    <div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
                    <div className="text-muted small mt-1">15m ago</div>
                  </div>
                </div>
              </a>
              <a href="#" className="list-group-item">
                <div className="row g-0 align-items-center">
                  <div className="col-2">
                    <img src="img/avatars/avatar-2.jpg" className="avatar img-fluid rounded-circle" alt="William Harris" />
                  </div>
                  <div className="col-10 ps-2">
                    <div className="text-dark">William Harris</div>
                    <div className="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
                    <div className="text-muted small mt-1">2h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" className="list-group-item">
                <div className="row g-0 align-items-center">
                  <div className="col-2">
                    <img src="img/avatars/avatar-4.jpg" className="avatar img-fluid rounded-circle" alt="Christina Mason" />
                  </div>
                  <div className="col-10 ps-2">
                    <div className="text-dark">Christina Mason</div>
                    <div className="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
                    <div className="text-muted small mt-1">4h ago</div>
                  </div>
                </div>
              </a>
              <a href="#" className="list-group-item">
                <div className="row g-0 align-items-center">
                  <div className="col-2">
                    <img src="img/avatars/avatar-3.jpg" className="avatar img-fluid rounded-circle" alt="Sharon Lessman" />
                  </div>
                  <div className="col-10 ps-2">
                    <div className="text-dark">Sharon Lessman</div>
                    <div className="text-muted small mt-1">Aenean tellus metus, bibendum sed, posuere ac, mattis non.</div>
                    <div className="text-muted small mt-1">5h ago</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="dropdown-menu-footer">
              <a href="#" className="text-muted">Show all messages</a>
            </div>
          </div>
        </li>
 */}
        <li className="nav-item dropdown">
          <a className="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
            <i className="align-middle" data-feather="settings"></i>
          </a>
          {/* <div>Icons made by <a href="https://www.flaticon.com/authors/catalin-fertu" title="Catalin Fertu">Catalin Fertu</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
          <a className="nav-link dropdown-toggle d-none d-sm-inline-block" href="#" data-bs-toggle="dropdown">
            {setUserIcon()}
            {/* <div className="bi-person top-50 start-0" style={{width: '40px', height: '40px'}}></div>
            <img src={props.userInfo.app_image_url} className="avatar img-fluid rounded me-1" alt="" />  */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              <path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
            </svg> */}
            <span className="text-dark">{props.userInfo.username}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            {/* <a className="dropdown-item" href="pages-profile.html"><i className="align-middle me-1" data-feather="user"></i> Profile</a>
            <a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="pie-chart"></i> Analytics</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="index.html"><i className="align-middle me-1" data-feather="settings"></i> Settings & Privacy</a>
            <a className="dropdown-item" href="#"><i className="align-middle me-1" data-feather="help-circle"></i> Help Center</a>
            <div className="dropdown-divider"></div> */}
            {buttonEl}
            {signupEl}
            {/* <a className="dropdown-item" href="#" onClick={props.logout}>{LogButtonText}</a> */}
          </div>
        </li>

      </ul>
    </div>
  </nav>


  )
}
const mapStateToProps = state => ({
  logged: state.users.logged,
  userInfo: state.users.userInfo
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
    logout: () => {
      dispatch({type: 'LOGOUT'})
      // dispatch(userActions.actionCreators.logout());
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
  )(NavbarExpandTop)
);
// export default NavbarExpandTop;