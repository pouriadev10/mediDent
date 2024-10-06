import React, { useState } from 'react';
import { Typography, Steps, Card, Button } from 'antd';
import DashboardLayout from '../../layout/dashboardLayout/DashboardLayout';
import CreateStep1 from './components/CreateStep1';
import CreateStep2 from './components/CreateStep2';
import CreateStep3 from './components/CreateStep3';
import CreateStep4 from './components/CreateStep4';

const { Title } = Typography;
const { Step } = Steps;

const CreateCampaigns = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [postCampaign, setPostCampaign] = useState(null);
    const [postCampaign2, setPostCampaign2] = useState(null);
    const [postCampaign3, setPostCampaign3] = useState(null);
    const [postCampaign4, setPostCampaign4] = useState(null);
    const [campaignData, setCampaignData] = useState({});
    const [campaignData2, setCampaignData2] = useState({});
    const [campaignData3, setCampaignData3] = useState({});
    const [campaignData4, setCampaignData4] = useState({});
    const [campaignId, setCampaignId] = useState(null);


    const handleReceivePostCampaignData = (func, data) => {
        setPostCampaign(() => func);
        setCampaignData(data);
        console.log(campaignData)
    };


    
    const handleReceiveCampaignId = (id) => {
        setCampaignId(id);
    };

    const handleReceivePostCampaignData2 = (func1, data1) => {
        setPostCampaign2(() => func1);
        setCampaignData2(data1);
        console.log(campaignData2)
    };

    const handleReceivePostCampaignData3 = (func1, data2) => {
        setPostCampaign3(() => func1);
        setCampaignData3(data2);
        console.log(campaignData3)
    };

    const handleReceivePatchCampaignData4 = (func1, data4) => {
        setPostCampaign4(() => func1);
        setCampaignData4(data4);
        console.log(campaignData3)
    };




    const handleButtonClick = async () => {
        if (currentStep === 0 && postCampaign) {
            await postCampaign();
            console.log(`Campaign ID from Child: ${campaignId}`);
        } else {
            console.log('Post campaign function not yet provided.');
        }
        if (currentStep === 1 && postCampaign2) {
            await postCampaign2();
            console.log(`Campaign ID from Child: ${campaignId}`);
        } else {
            console.log('Post campaign function not yet provided.');
        }
        if (currentStep === 2 && postCampaign3) {
            await postCampaign3();
            console.log(`Campaign ID from Child: ${campaignId}`);
        } else {
            console.log('Post campaign function not yet provided.');
        }
        if (currentStep === 3 && postCampaign4) {
            await postCampaign4();
            console.log(`Campaign ID from Child: ${campaignId}`);
        } else {
            console.log('Post campaign function not yet provided.');
        }
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
    };


    const getStepStatus = (stepIndex) => {
        if (stepIndex < currentStep) {
            return 'finish';
        } else if (stepIndex === currentStep) {
            return 'process';
        } else {
            return 'wait';
        }
    };
    console.log(campaignId)


    return (
        <DashboardLayout>
            <div style={{ marginTop: 55, marginLeft: 20, marginRight: 30 }}>
                <div className="flex-row-space-between-marginBottom-20">
                    <Title level={4}>Create Campaigns</Title>
                </div>
                <div style={{ paddingRight: '16px', marginBottom: 45 }}>
                    <Steps current={currentStep}>
                        <Step
                            title="Campaign Information"
                            status={getStepStatus(0)}
                        />
                        <Step
                            title="Audience Details"
                            status={getStepStatus(1)}
                        />
                        <Step
                            title="Delivery Information"
                            status={getStepStatus(2)}
                        />
                        <Step
                            title="Confirmation"
                            status={getStepStatus(3)}
                        />
                    </Steps>
                </div>
                <Card style={{ paddingLeft: 10 }}>
                    {currentStep === 0 && (
                        <CreateStep1 providePostCampaignData={handleReceivePostCampaignData} sendCampaignId={handleReceiveCampaignId} />
                    )}
                    {currentStep === 1 && (
                        <CreateStep2 campaignid={campaignId} providePatchCampaignData2={handleReceivePostCampaignData2} />
                    )}
                     {currentStep === 2 && (
                        <CreateStep3 providePutCampaignData2={handleReceivePostCampaignData3} campaignid={campaignId} />
                    )}
                    {currentStep === 3 && (
                        <CreateStep4 campaignid={campaignId} providePatchCampaignData3={handleReceivePatchCampaignData4} />
                    )}
                </Card>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                    <div style={{ marginTop: 30 }}>
                        <Button
                            style={{ width: 131, height: 45, borderRadius: '5000px', fontSize: 16, border: '2px solid #6B43B5', color: '#6B43B5', background: 'white' }}
                            type="default"
                            onClick={() => setCurrentStep(Math.max(currentStep - 1, 0))}
                            disabled={currentStep === 0}
                        >
                            Back
                        </Button>
                    </div>
                    <div style={{ marginLeft: 'auto', marginTop: 30 }}>
                        {currentStep !== 3 && (
                            <Button
                            style={{ marginLeft: 'auto', marginRight: 25, width: 131, height: 45, borderRadius: '5000px', fontSize: 16 }}
                            type="primary"
                            onClick={handleButtonClick}
                            // disabled={currentStep === 3}
                        >
                            Next
                        </Button>
                        )}
                         {currentStep === 3 && (
                            <Button
                            style={{ marginLeft: 'auto', marginRight: 25, width: 131, height: 45, borderRadius: '5000px', fontSize: 16 }}
                            type="primary"
                            onClick={handleButtonClick}
                            // disabled={currentStep === 3}
                        >
                            Done
                        </Button>
                        )}
                        
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default CreateCampaigns;
