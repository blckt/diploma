import HomeView from './components/HomeView'
import cookie from 'js-cookie';

// Sync route definition
export default {
  component: HomeView,
  onEnter: (nextState, replace,done) => {
    fetch('http://localhost:3000/auth/ping', {
      method: 'GET',
      headers: new Headers({
        'Authorization': cookie.get('auth_id')
      })
    }).then(response => {
      if (response.status === 401 || response.status === 500) {
        console.log('here');
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        }); 
        return done();       
      }      
      console.log('hereeeee') 
      done();
    }).catch(err => {
      console.error(err)
      done();
    })
  }
}
