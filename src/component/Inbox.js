
import React from "react";
import { Card, Container, ListGroup, Button, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useMailbox from "./useMailbox";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const Inbox = () => {
    const email = useSelector(state => state.auth.email)
    const { mails, isLoading , handleMailClick, countUnreadMails, handleComposeClick} = useMailbox(`mailboxes/${email}/inbox`);
    const history = useHistory();

    

    if (isLoading) {
        return <Loading />;
    }
  
   

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center vh-80">
                <Card className="shadow" style={{ width: "70rem", marginTop: "3rem" }}>
                    <Card.Header style={{ textAlign:"center", backgroundColor: '#cafad7'}}>
                        <h5>Inbox</h5>
                    </Card.Header>
                    <Card.Body>
                        {mails.length > 0 ? (
                            <ListGroup>
                                {mails.map((mail) => (
                                    <ListGroup.Item
                                        key={mail.id}
                                        onClick={() => handleMailClick(mail)}
                                        style={{ cursor: 'pointer', backgroundColor: mail.read ? '' : '#d3eff8' }}>
                                        <strong>From: {mail.from}</strong>
                                        <br />
                                        <span>Subject: {mail.subject}</span>
                                        <br/>
                                        {!mail.read && <Badge bg="info">New</Badge>}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>Inbox is empty.</p>
                        )}
                    </Card.Body>
                   <Card.Footer>
                      <Button variant="primary" onClick={handleComposeClick}>
                         Compose
                      </Button>
                     <div className="float-end">
                         <Badge bg="danger">{countUnreadMails()}</Badge> Unread
                     </div>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    );
};

export default Inbox;








