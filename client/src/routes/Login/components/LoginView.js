import React from 'react'
import './LoginView.scss'

// export const LoginView = (props) => (
//   <div>
//     <h4>Welcome!</h4>
//     <h2>This is loginView</h2>
//    <button onClick={props.login}></button>
//   </div>
// );
export class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    login: 'admin',
    password: 'sadilo1994'
  };

  render() {
    console.log(this)
    return (
      <div>
        <h4>Welcome!</h4>
        <h2>This is loginView</h2>
        <button onClick={()=>{console.log('clicked');this.props.login(this.state.login,this.state.password,this.props.location.nextState)}}>Hello </button>
      </div>
    )
  }
}

export default LoginView
