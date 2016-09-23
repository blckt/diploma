import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '/login',
  onEnter: (options, replace) => {
    "use strict";
    if (localStorage.token) replace('/');
  },
  getComponent: (nextState, cb) => {
    require.ensure([], function (require) {
      /*  Webpack - use 'require.ensure' to create a split point
    and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        /*  Webpack - use require callback to define
         dependencies for bundling   */
        const LoginView = require('./containers/LoginContainer').default
        const reducer = require('./modules/login').default

        /*  Add the reducer to the store on key 'counter'  */
        injectReducer(store, { key: 'login', reducer })

        /*  Return getComponent   */
        cb(null, LoginView)

        /* Webpack named bundle   */
      }, 'login')
    })
  }
})