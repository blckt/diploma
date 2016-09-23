import * as constants from '../constants'
import 'whatwg-fetch';

export function login(form, redirect) {
  console.log(form);
  return dispatch => {
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify(form)
    }).then(response => {
      return response.json();
    }).catch(err => console.log(err))
      .then(json => {
        dispatch({
          type: constants.LOGGED_IN,
          payload: { token: json.token }
        });
        if (redirect) redirect()
      })


    // Can be used to navigate to a new route


  }
}

export function switchLocale(locale) {
  return { type: constants.LOCALE_SWITCHED, payload: locale }
}

export function hideError() {
  return {  type: constants.HIDE_ERROR }
}
