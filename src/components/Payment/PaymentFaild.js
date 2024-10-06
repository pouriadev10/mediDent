import React from 'react';
import faild from '../../assets/icons/faild.svg';
import { Button } from "antd";


const PaymentFaild = ({ response, onRetry }) => {
  return (
    <div style={{ width: 538, flexDirection: 'column', textAlign: 'center' }}>
      <img src={faild} alt='' style={{ width: 65, height: 65 }} />
      <div style={{ fontSize: 16, marginTop: 20 }}>Your payment has failed.</div>
      <div style={{ fontSize: 16, marginTop: 20 }}>{response}</div>
      <Button 
        type='primary'
        onClick={onRetry} 
        style={{ marginTop: 20, padding: '10px 20px', fontSize: 16, cursor: 'pointer', width: 139, height: 38 }}
      >
        Retry 
      </Button>
    </div>
  );
};

export default PaymentFaild;