import React from 'react';
import { Table, Column, Cell, ColumnGroup } from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.min.css';
import { Row, Col, OverlayTrigger, Button, Popover } from 'react-bootstrap';
import 'whatwg-fetch'
const fields = [
  'Пільговий контингент',
  'Форма навчання',
  '№ п/п',
  'Прізвище, ім\'я та по батькові',
  'Стипендія',
  'Середній бал'
];

const popoverHoverFocus = (props)=>(<Popover style={{
width:452
}} id="popover-trigger-hover-focus">
    <Table
      height={350}
      width={452}
      rowHeight={50}
      headerHeight={50}
      rowsCount={props.sessions[0].Exams.length}>
      <Column
        header={<Cell >Назва</Cell>}
        cell={cellProps=><Cell {...cellProps}>{props.sessions[0].Exams[cellProps.rowIndex].ExamName}</Cell>}
        width={150}
        fixed={true}
      />
      <Column
        fixed={true}
        header={<Cell >Тип</Cell>}
        cell={cellProps=><Cell {...cellProps}>{props.sessions[0].Exams[cellProps.rowIndex].Type}</Cell>}
        width={75}
      />
      <Column
        fixed={true}
        header={<Cell >Відмітка</Cell>}
        cell={cellProps=><Cell {...cellProps}>{props.sessions[0].Exams[cellProps.rowIndex].Balone}</Cell>}
        width={75}
      />
      <Column
        fixed={true}
        header={<Cell >Відмітка</Cell>}
        cell={cellProps=><Cell {...cellProps}>{props.sessions[0].Exams[cellProps.rowIndex].Normal}</Cell>}
        width={75}
      />
      <Column
        fixed={true}
        header={<Cell >Відмітка</Cell>}
        cell={cellProps=><Cell {...cellProps}>{props.sessions[0].Exams[cellProps.rowIndex].Char}</Cell>}
        width={75}
      />
    </Table>
  </Popover>
);


export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      direction       : 'bottom',
      showNotification: false
    };
  }

  sendData = (data)=> {

    fetch(this.props.fetchUrl, {
      method : 'POST',
      body   : JSON.stringify({
        GroupNumber: this.props.data.number,
        Students   : this.props.data.Students

      }),
      headers: new Headers({ 'Authorization': localStorage.token })
    }).then(data=> {
      this.props.clearData();
    })
  };

  onMouseMove (e) {
    const mX = e.pageX;
    const mY = e.pageY;
    this.setState({
      direction: ($(window).width() - mY) > 350 ? 'bottom' : 'top'
    });
  }
  
  render () {
    const { data }=this.props;
    return (
      <Row style={{paddingTop:15}}>
        <Col sm={12} md={12}>
           <Table rowHeight={50}
                 rowsCount={data.Students.length}
                 width={850}
                 height={350}
                 headerHeight={50}>
            <Column
              header={<Cell >{fields[0]}</Cell>}
              cell={props=><Cell {...props}>{data.Students[props.rowIndex].isPrives}</Cell>}
              width={75}
              flexGrow={1}
            />
            <Column
              header={<Cell>{fields[1]}</Cell>}
              cell={props=><Cell {...props}>{data.Students[props.rowIndex].StudyType}</Cell>}
              width={50}
              flexGrow={1}
            />
            <Column
              header={<Cell>{fields[2]}</Cell>}
              cell={props=><Cell {...props}>{data.Students[props.rowIndex].nmbInGroup}</Cell>}
              width={50}
              flexGrow={1}
            />
            <Column
              header={<Cell>{fields[3]}</Cell>}
              cell={props=><Cell {...props}

          onClick={this.onMouseMove.bind(this)}>
                 <OverlayTrigger trigger="click" rootClose placement={this.state.direction}
                  overlay={popoverHoverFocus(data.Students[props.rowIndex])}>
                 <span style={{
                 cursor:'pointer'
                 }}>{data.Students[props.rowIndex].Name}</span>
</OverlayTrigger></Cell>  }
              flexGrow={2}
              width={175}
            />
            <Column
              header={<Cell>{fields[4]}</Cell>}
              cell={props=><Cell {...props}>{data.Students[props.rowIndex].isGrant?
            <span className="glyphicon glyphicon-ok"></span>:
            <span className="glyphicon glyphicon-remove"></span>}</Cell>}
              width={85}
            />
            <Column
              header={<Cell>{fields[5]}</Cell>}
              cell={props=><Cell {...props}>{data.Students[props.rowIndex].sessions[0].avg}</Cell>}
              width={50}
              flexGrow={1}
            />
          
          </Table>
          <Button bsStyle="primary" onClick={this.sendData}>Send Data</Button>
        </Col>
      </Row>
    
    );
  }
}

/*
 {fields.map((item, i)=> {
 return <th key={i} className="rotate">{item}</th>;
 })}
 {data.Students[0].sessions[0].Exams.map((exam, i)=> {
 return <th key={i} className="rotate">{exam.ExamName}</th>;
 })}
 
 */