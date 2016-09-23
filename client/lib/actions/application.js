import * as constants from '../constants'
import 'whatwg-fetch'

export function login (form, redirect) {
  return dispatch => {
    fetch ('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify (form)
    })
      .then (response => {
        return response.json ()
      })
      .catch (err => console.log (err))
      .then (json => {
        if (json.token) {
          dispatch ({
            type: constants.LOGGED_IN,
            payload: { token: json.token }
          })
          if (json.error)
            dispatch ({
              type: constants.SHOW_ERROR,
              payload: { message: json.error, code: 401 }
            })

        }
        if (redirect) redirect ()
      })
  }
}

export function pingAuth (user) {
  //PING_AUTH
  return {
    type: constants.PING_AUTH,
    payload: user
  }
}
export function switchLocale (locale) {
  return { type: constants.LOCALE_SWITCHED, payload: locale }
}

export function hideError () {
  return { type: constants.HIDE_ERROR }
}
