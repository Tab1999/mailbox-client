import React from "react";
import { Container, Card } from "react-bootstrap";

const Home =()=>{
    
    return<>
    <Container className="d-flex align-items-center justify-content-center vh-80">
      <Card className="shadow" style={{ width: '70rem', marginTop: '3rem' }}>
        <Card.Body>
           <h1 style={{textAlign:'center'}}>Welcome to MailBox</h1>
      </Card.Body>
      </Card>
    </Container>
    </>
}

export default Home