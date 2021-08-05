import * as types from '../actions/ActionTypes';

const initialState = {
    color : 'black', 
    number : 0,
    userInfo: {}
};

function counter (state=initialState, action){
    switch(action.type){
        case types.INCREMENT:
            return{
                ...state,
                number:state.number+1
            };
        case types.DECREMENT:
            return{
                ...state,
                number:state.number-1
            };
        case types.SET_COLOR:
            return{
                ...state,
                color : action.color
            };
        case types.SET_USER_INFO:
            return{
                ...state,
                userInfo : action.info
            };
        default:
        return state;
    }
}

export default counter;
