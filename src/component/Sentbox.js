
import React from "react";
import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useMailbox from "./useMailbox";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const Sentbox = () => {
    const email = useSelector(state => state.auth.email)
    const { mails, isLoading,handleComposeClick } = useMailbox(`mailboxes/${email}/sentbox`);
    const history = useHistory();

    const handleMailClick = (mail) => {
        history.push(`/message/${mail.id}`);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center vh-80">
                <Card className="shadow" style={{ width: "70rem", marginTop: "3rem" }}>
                    <Card.Header style={{ textAlign:"center", backgroundColor: '#cafad7'}}>
                        <h5>SentBox</h5>
                    </Card.Header>
                    <Card.Body>
                        {mails.length > 0 ? (
                            <ListGroup>
                                {mails.map((mail) => (
                                    <ListGroup.Item
                                        key={mail.id}
                                        onClick={() => handleMailClick(mail)}>
                                        <strong>To: {mail.to}</strong>
                                        <br />
                                        <span>Subject: {mail.subject}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>Sentbox is empty.</p>
                        )}
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="primary" onClick={handleComposeClick}>
                         Compose
                      </Button>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    );
};

export default Sentbox;






