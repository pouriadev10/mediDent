import React, { useState } from 'react';
import { Row, Form, Input, Spin, Button, Modal } from 'antd';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PlaceSearch from "./PlaceSearch"

// component 
import AddConnectedAccount from "./AddConnectedAccount"
import { controller } from '../controller';



const CreateBankAccount = (props) => {
  const [openAddConnectedAccount, setOpenAddConnectedAccount] = useState(false);
  const [loadingNewAccount, setLoadingNewAccount] = useState(false);

  const handleSkip = async () => {
    const response = await controller.skipOnBoarding();

    props.readOnboardingStatus();
  };

  const handleOpenAddConnectedAccount = () => {
    setOpenAddConnectedAccount(true);
  };

  const handleCloseAddConnectedAccount = () => {
    setOpenAddConnectedAccount(false);
  };

  const submitConnectedAccount = async () => {
    // Add your logic for submitting the connected account here
    setLoadingNewAccount(true);
    // Example: Simulating an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoadingNewAccount(false);
    handleCloseAddConnectedAccount();
  };
  return (
    <>
      <p style={{ fontSize: "20px", fontWeight: "500", marginBottom: 37 }}>Select Bank Account for Your Office</p>
      <div className='box-onboarding-text' style={{marginBottom: 40}}>
        <span style={{fontSize: 14, fontWeight: 600}}>
          You don’t have any bank accounts, Please add Your Bank Account first.
        </span>


      </div>

      <Button onClick={handleOpenAddConnectedAccount} className='login-button mt15' style={{marginBottom: 15}}>
        Add
      </Button>
      <div className='skip-btn mt5' onClick={handleSkip}>
        Skip
      </div>

      <Modal
        title="Add Connected Account"
        onCancel={handleCloseAddConnectedAccount}
        visible={openAddConnectedAccount}
        onOk={handleCloseAddConnectedAccount}
        footer={null}
        okText={!loadingNewAccount ? 'Create new connected account' : <Spin />}
      >
        <div className="content">
          <AddConnectedAccount readOnboardingStatus={props.readOnboardingStatus} officeId={props.officeId} submitConnectedAccount={submitConnectedAccount} />
        </div>
      </Modal>
    </>
  );
};

export default CreateBankAccount;
