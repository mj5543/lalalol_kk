// imports

import axios from 'axios';
import {isEmpty} from 'lodash';
import storage from '../../components/lib/storage';

// actions

const SET_PROVIDE_USER_CHECK = "SET_PROVIDE_USER_CHECK";
const SET_USER_INFO = "SET_USER_INFO";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT = "LOGOUT";
const GET_LOCATION_IP = "GET_LOCATION_IP";

// action creators

function setProvideUserCheck(items) {
  return {
    type: SET_PROVIDE_USER_CHECK,
    items
  };
}
function getProvideUserCheck(params) {
  return async(dispatch, getState) => {
		const res = await axios.post('/api/userCheck', params);
    dispatch(setProvideUserCheck(res))
		console.log('getProvideUserCheck--', res);
		if(isEmpty(res.data.result)) {
			// history.push("/sign-up", params);
		}
	}
}
function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    userInfo
  };
}
const setIpInfo = (info) => {
  return {
    type: GET_LOCATION_IP,
    ipInfo: info
  }
}

const getIpInfo = () => {
  return async(dispatch, getState) => {
    try {
      const ipData = await fetch('https://geolocation-db.com/json/'); 
      const locationIp = await ipData.json();
      dispatch(setIpInfo(locationIp)) 
      console.log(locationIp);
      console.log(locationIp.IPv4);
    }catch(e) {
      console.log('getIpInfo Error:: ', e);

    }
  }
};
const logout = () => ({
  type: LOGOUT
});
//https://velog.io/@killi8n/Dnote-5-3.-React-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9C%A0%EC%A7%80-%EB%B0%8F-%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84.-hfjmep7915
// API Actions

// function getProvideUserCheck() {
//   return (dispatch, getState) => {
//     fetch("MOCK_DATA.json", {
//       headers : { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       }
//    })
//     .then(response => data)
//     .then(json => dispatch(setProvideUserCheck(json)))
//     .catch(err => console.log(err));
//   };
// }


// Initial State

const initialState = {logged: false, userInfo: {}, ipInfo: {}};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROVIDE_USER_CHECK:
      return applySetProvideUserCheck(state, action);
    case SET_USER_INFO:
      return applyUserInfo(state, action);
    case LOGOUT:
      return userLogout(state, action);
    case GET_LOCATION_IP:
      return applyIpInfo(state, action);
      default:
      return state;
  }
}

// Reducer Functions

function applySetProvideUserCheck(state, action) {
  const { items } = action;
  return {
    ...state,
    items
  };
}
function applyUserInfo(state, action) {
  const { userInfo } = action;
  return {
    ...state,
    logged: true,
    userInfo
  };
}
function applyIpInfo(state, action) {
  const { ipInfo } = action;
  return {
    ...state,
    ipInfo
  };

}
function userLogout(state, action) {
  storage.remove('loggedInfo');
  return {
    ...state,
    logged: false,
    userInfo: {}
  };
}

// Exports

const actionCreators = {
  getProvideUserCheck,
  setUserInfo,
  logout,
  getIpInfo
};

export { actionCreators };

// Export reducer by default

export default reducer;