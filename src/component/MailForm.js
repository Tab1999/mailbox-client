
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const MailForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const email = useSelector(state => state.auth.email);
  const history = useHistory();

  const handleSend = async () => {
    const contentState = editorState.getCurrentContent();
    console.log(contentState);
    const content = JSON.stringify(convertToRaw(contentState));

    

    const emailData = {
      to, subject, content, from, timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, `mailboxes/${to}/inbox`), emailData);
      await addDoc(collection(db, `mailboxes/${email}/sentbox`), emailData);
      
      setFrom('');
      setTo('');
      setSubject('');
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error("Error adding document: ", error);
    }
      history.goBack();
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-80" >
      <Card className="shadow" style={{ width: '70rem', marginTop:'3rem'}}>
      <Form style={{padding:'2rem'}}>
        <Form.Group className="mb-3" controlId="formTo">
        <Form.Label>From:</Form.Label>
        <Form.Control type="text" value={from} onChange={(e) => setFrom(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTo">
        <Form.Label>To:</Form.Label>
        <Form.Control type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSubject">
        <Form.Label>Subject:</Form.Label>
        <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formContent">
        <Form.Label>Content:</Form.Label>
        <Editor editorState={editorState} onEditorStateChange={setEditorState} />
      </Form.Group>

      <Button variant="primary" onClick={handleSend}>
        Send
      </Button>
    </Form>
    </Card>
    </Container>
  );
};

export default MailForm;

