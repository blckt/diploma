import React, { PropTypes } from 'react';
import DisplayError from './DisplayError';
import { connect } from 'react-redux';
import { Header } from './Header';
class Application extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    application: PropTypes.object
  };

  constructor (props, context) {
    super (props, context);
    this.handleMenuClick = this.handleMenuClick.bind (this);
    this.state = {
      isMenuActive: false
    };
  }

  componentDidUpdate () {

  }

  handleMenuClick (evt) {
    evt.preventDefault ();
    this.setState ({ isMenuActive: !this.state.isMenuActive });
  }

  render () {
    const { isMenuActive } = this.state;
    const activeClass = isMenuActive ? 'active' : '';
    return (
      <div id="layout" className={activeClass}>
        <div id="main">
          <DisplayError />
          <Header/>
          {/* this will render the child routes */}
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default connect (
  ({ application }) => ({ application })) (Application);
