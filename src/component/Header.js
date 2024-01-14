import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store/auth';
import {Link, NavLink} from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Header =()=> {
    const isAuth = useSelector(state => state.auth.isLoggedIn) ;
    const dispatch = useDispatch();

    const logoutHandler=()=>{
        dispatch(authAction.logout());
    }
    
  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-end"  >
      <Container style={{marginBottom:'0rem', padding:'1rem' }}>
        <Navbar.Brand as={Link} to="/">MailBox-Client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            {isAuth && <Nav.Link as={NavLink} to="/sentbox" style={{paddingRight:'1rem'}}>Sentbox</Nav.Link>}
            {isAuth && <Nav.Link as={NavLink} to="/inbox" style={{paddingRight:'1rem'}}>Inbox</Nav.Link>}
            {isAuth && <Button variant='outline-dark' onClick={logoutHandler}>Logout</Button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;