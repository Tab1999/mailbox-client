// Loading.js
import React from 'react';
import { Spinner } from 'react-bootstrap'; 

const Loading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Spinner animation="border" role="status" style={{marginBottom: '6rem'}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
