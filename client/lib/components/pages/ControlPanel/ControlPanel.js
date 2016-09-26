import React, { PropTypes } from 'react';
// import {
//   defineMessages,
//   FormattedMessage
// } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';

const routerMenuItems = [
  { text: 'Users Registrartion', to: '/dashboard/register', icon: 'fa fa-user' },
  { text: 'Users control', to: '/dashboard/users', icon: 'fa fa-users' }
];


class ControlPanel extends React.Component {
  constructor (props) {
    super (props);
  }

  static propTypes = {
    application: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired
  };

  render () {
    return (
      <div>

        <Grid className="full-width">
          <Row className="full-width">
            <Col sm={12} md={1} >
              <ul className="nav nav-pills nav-stacked">
                {routerMenuItems.map ((item, i)=><li role="presentation"><Link className='link'  {...item}
                                                                               key={i}>{item.text}</Link>
                </li>)}
              </ul>
            </Col>
            <Col sm={12} md={9}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


export default connect (({ application }) => ({ application })) (ControlPanel);
