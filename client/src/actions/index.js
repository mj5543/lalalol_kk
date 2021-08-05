import * as types from './ActionTypes';

export const increment = () => ({
type : types.INCREMENT
});
export const decrement = () => ({
type : types.DECREMENT
});
export const setColor = (color) => ({
type : types.SET_COLOR,
color
});
export const setUserInfo = (info) => ({
  type : types.SET_USER_INFO,
  info
  });
  