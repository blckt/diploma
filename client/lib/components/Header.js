import React from 'react';
import {
  Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router';
const menuItems = [
  { text: 'Account', to: '/account', icon: 'fa fa-user' },
  { text: 'Dashboard', to: '/dashboard', icon: 'fa fa-wpforms' }
];
export function Header ({ userName }) {
  return (<Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>Scheduler</Link>
      </Navbar.Brand>

    </Navbar.Header>
    <Navbar.Toggle/>
    <Navbar.Collapse>
      {menuItems.map((item,index)=>{
        return  <Navbar.Text key={index}><Link key={index}{...item}>{item.text}</Link></Navbar.Text>;
      })}
      <Navbar.Text pullRight>
        Signed in as: <Navbar.Link href="#">{userName || 'JohnDoe'}</Navbar.Link>
      </Navbar.Text>
      <Navbar.Text pullRight>
        Have a great day!
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>);
}
