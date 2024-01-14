import React, { useEffect, useState } from "react";
import { Container, Button, Card, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Trash } from "react-bootstrap-icons"; 
import Loading from "./Loading";

const Message = () => {
  const [receivedMails, setReceivedMails] = useState([]);
  const email = useSelector((state) => state.auth.email);
  const history = useHistory();
  const messageId = useParams().messageId; 
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setIsLoading(true);
        const inboxMessageDoc = await getDoc(doc(db, `mailboxes/${email}/inbox/${messageId}`));
        if (inboxMessageDoc.exists()) {
           console.log(inboxMessageDoc.data());
          setReceivedMails([inboxMessageDoc.data()]);
        } else {
         
          const sentboxMessageDoc = await getDoc(doc(db, `mailboxes/${email}/sentbox/${messageId}`));
          if (sentboxMessageDoc.exists()) {
            setReceivedMails([sentboxMessageDoc.data()]);
          } else {
            console.log("Message Not Found");
          }
        }
      } catch (error) {
        console.error("Error fetching message: ", error);
      }
      finally{
        setIsLoading(false);
      }
    };

    fetchMessage();
  }, [email, messageId]);


  const handleBackClick = () => {
    history.goBack();
  };

  if(isLoading){
    return <Loading/>
  }


  const extractTextFromJSON = (jsonContent) => {
    try {
      const parsedContent = JSON.parse(jsonContent);
      const text = parsedContent?.blocks?.[0]?.text || "";
      return text;
    } catch (error) {
      console.error("Error parsing JSON content: ", error);
      return "";
    }
  };

  const handleDeleteClick = async () => {
    const messageDocRef = doc(db, `mailboxes/${email}/inbox/${messageId}`);
    await deleteDoc(messageDocRef);

   
    const sentboxMessageDocRef = doc(db, `mailboxes/${email}/sentbox/${messageId}`);
    await deleteDoc(sentboxMessageDocRef);

    history.goBack();
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-80">
      <Card className="shadow" style={{ width: "100rem" , marginTop:'3rem'}}>
        <Card.Header style={{ textAlign:"center", backgroundColor: '#cafad7'}}>
          <h5>Message</h5>
        </Card.Header>
        <Card.Body>
        {receivedMails.map((mail) => {
            const timestampMilliseconds =
              mail.timestamp.seconds * 1000 + mail.timestamp.nanoseconds / 1e6;

            const mailDate = new Date(timestampMilliseconds);
            // console.log(mailDate);
            const formattedDateAndTime = mailDate.toLocaleString('en-US', {
              timeZone: 'Asia/Kolkata', 
            });

           
            return (
              <ListGroup.Item key={mail.id}>
                {/* <span><strong>From:  </strong>{mail.from}</span>
                <br/>
                <span><strong>To:  </strong>{mail.to}</span>
                <br/> */}
                <span><strong>Date:  </strong>{formattedDateAndTime}</span>
                <br />
                <span><strong>Subject:  </strong>{mail.subject}</span> 
                <br />
                <span ><strong>Message:  </strong>{extractTextFromJSON(mail.content)}</span>
                <br />
                <Button variant="danger" onClick={handleDeleteClick}>
                  <Trash size={20} />
                </Button>
              </ListGroup.Item>
            );
          })}
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={handleBackClick}>
            Back
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Message;
