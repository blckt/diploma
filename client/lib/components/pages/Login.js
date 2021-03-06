import React, { PropTypes } from 'react';
import * as actions from '../../actions/application';

export default class Login extends React.Component {

  static propTypes = {
    location: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.any,
    history: PropTypes.object.isRequired
  };

  constructor (props) {
    super (props);
    this.state = { login: null, password: null };
  }

  handleInputChange (evt) {
    this.setState ({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit (evt) {
    evt.preventDefault ();
    if (!this.state.login || !this.state.password)    return;

    const { history, store } = this.context;
    const { location } = this.props;

    let nextPath = '/account';
    if (location.state && location.state.nextPathname)
      nextPath = location.state.nextPathname;
    store.dispatch (actions.login (this.state, () => {
      // redirect to a secure page
      history.pushState ({}, nextPath);
    }));
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Login</h1>
        </div>
        <div className="content">
          <form
            className="explore pure-form pure-form-aligned"
            onSubmit={::this.handleSubmit}
            onChange={::this.handleInputChange}>
            <fieldset>
              <div className="pure-control-group">
                <label htmlFor="login">Login</label>
                <input type="text" name="login" placeholder="Enter your login please..."/>
              </div>
              <div className="pure-control-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Enter your password please..."/>
              </div>
              <button type="submit" disabled={!this.state.login || !this.state.password}
                      className="pure-button pure-button-primary"
              >Login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
