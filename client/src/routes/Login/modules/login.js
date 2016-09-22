import request from 'superagent';
import cookies from 'js-cookie';
import { browserHistory } from 'react-router';
// ------------------------------------
// Constants
// ------------------------------------
export const DO_LOGIN = 'DO_LOGIN';

const DEFAULT_URL = 'http://localhost:3000/';
const _state = {
  result: false,
  token: '',
  nextState:'/'
}
// ------------------------------------
// Actions
// ------------------------------------
export function doLogin(login, password,nextState) {
  return {
    type: DO_LOGIN,
    payload: { login, password,nextState}
  }
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk!

 NOTE: This is solely for demonstration purposes. In a real application,
 you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
 reducer take care of this logic.  */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  doLogin
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DO_LOGIN]: (state = _state, action) => {
    let data = action.payload;
     request.post(`${DEFAULT_URL}auth/login`)
      .send(data)
      .then(result => {
        return JSON.parse(result.text);
      })
      .catch(err => {
        console.log('err');
        console.log(err);
        _state.result = false;
      })
      .then(json => {
        if (!!json.token) {
          _state.token = json.token;
          _state.result = true;
          cookies.set('auth_id', _state.token);
          browserHistory.push(state.nextState || '/');
        }
      })
  
    return _state;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
