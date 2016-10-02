/*
 global $
 */

import React from 'react';
import 'whatwg-fetch';
import 'jquery';
import 'bootstrap-fileinput/css/fileinput.min.css';
import {Snackbar} from 'material-ui'
import { Form } from 'react-bootstrap';
import StudentsTable  from '../../StudentsTable';

const DEFAULT_URL = 'http://localhost:3000/';

import './style.scss';
class XlsUploadPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      group           : null,
      showNotification: false
    };
  }

  setGroup (group) {
    this.setState({
      group,
      showNotification:false
    });
  }
  componentDidMount () {
    const component = this;
    $(this._fileinput).fileinput({
      uploadUrl            : DEFAULT_URL + 'xls/file',
      async                : true,
      showPreview          : true,
      showUploadedThumbs   : false,
      allowedFileExtensions: ['xls', 'xlsx'],
      ajaxSettings         : {
        headers: {
          'Authorization': localStorage.token
        }
      }
    }).on('fileuploaded', function(event, data) {
      component.setGroup(JSON.parse(data.jqXHR.responseText));
    });
  }

  clearData () {
    this.setState({
      group: null,
      showNotification:true
    });
  }

  render () {
    return (<div>
      <Snackbar
      message={'Success!'}
      open={this.state.showNotification}/>
      <Form>
        <label className="control-label">Select File</label>
        <input id="file" type="file" className="file" ref={c=>this._fileinput=c}/>
      </Form>
      {this.state.group ? <StudentsTable fetchUrl={`${DEFAULT_URL}students/add`}
                                         clearData={this.clearData.bind(this)} data={this.state.group}/> : null}
    </div>);
  }
}
export default XlsUploadPage;
