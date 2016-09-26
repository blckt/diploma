import React from 'react';
import { findDOMNode } from 'react-dom';
import { series } from 'async';
import {
  Row,
  Col,
  Grid,
  FormGroup,
  FormControl,
  ControlLabel,
  Form,
  ProgressBar,
  Button
} from 'react-bootstrap';
import Table from '../../TableView';
import 'whatwg-fetch';
import { showError } from '../../../actions/application';
import { store } from '../../../Root';
const REG_URL = 'http://localhost:3000/auth/register';


class UsersRegistration extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      progress: 0,
      promises: [],
      isSuccess: false,
      progressBar: {
        length: 0,
        isVisible: false,
      },
      usersData: [],
      usersErrors: [],
    };
    this.regUsers = this.regUsers.bind (this);
  }

  componentDidMount () {
    const form = findDOMNode (this._form);
    form.addEventListener ('submit', (e)=> {
      e.preventDefault ();
      const textArea = findDOMNode (this._textarea);
      if (!textArea.value) {
        store.dispatch (showError ({ message: 'Поле не может быть пустым' }));
        return false;
      }
      this.sendRequestsAsync (textArea.value);
    });
  }

  sendRequestsAsync (values) {
    this.setState ({ promises: [], progress: 0, usersData: [], usersErrors: [] });
    this.trimUsersLogins (values)
        .forEach (login=> {
          this.state.promises.push (this.regUsers (login));
        });
    series (this.state.promises, ()=> {
      this.setState ({ isSuccess: true });
    });
  }

  trimUsersLogins (logins) {
    return logins.split (/\s/)
                 .filter (item=>!!item);
  }

  regUsers (login) {
    return cb=> {
      fetch (REG_URL, {
        method: 'POST',
        body: JSON.stringify ({ login })
      })
        .then (response=>response.json ())
        .catch (err=>console.log (err))
        .then (json=> {
          this.setState ({ progress: ++this.state.progress });
          if (json && json.error) {
            this.state.usersErrors.push (json);
            return cb (null, json);
          }
          this.state.usersData.push (json);
          cb (null, json);
        });
    };
  }

  render () {
    return (<Grid fluid>
      <Row>
        <Col md={4} sm={12}>
          <Form horizontal ref={(c)=>this._form=c}>
            <FormGroup controlId="logins">
              <ControlLabel>Login list</ControlLabel>
              <FormControl componentClass="textarea" ref={(c)=>this._textarea=c} style={{
                minHeight:350,
                resize:'none'
              }} placeholder="Put login list here"/>
            </FormGroup>
            <ProgressBar style={{
              display:this.state.progress>0?'block':'none'
            }} now={ this.state.progress } max={ this.state.promises.length } min={0}/>
            <Button type="submit">
              Register
            </Button>
          </Form>
        </Col>
        <Col md={4} sm={12} mdOffset={2}>
          <Table style={ { display:this.state.usersData.length > 0 ? 'table' : 'none' } } data={ this.state.usersData }
                 labels={['login','password']} striped bordered condensed hover/>
          <Table style={ { display:this.state.usersErrors.length>0?'table':'none' } } data={this.state.usersErrors}
                 labels={['error','code']} striped bordered condensed hover/>
        </Col>

      </Row>
    </Grid>);
  }
}

export default UsersRegistration;
