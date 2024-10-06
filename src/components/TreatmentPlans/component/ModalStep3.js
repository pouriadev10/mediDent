import React, { useEffect, useState, useCallback } from "react";
import { Modal, Input, Select, Button, Spin, Row, notification, Col } from 'antd';
import { controller } from '../controller'
import { debounce } from 'lodash';


const { TextArea } = Input;
const { Option } = Select;


const ModalStep3 = ({ selectedMember, isModalVisible, setIsModalVisible, handleSuccessAddToServer, patientId, handleReadData, processTreatmentPlans, handleReadData2 }) => {
    const [treatmentDescription, setTreatmentDescription] = useState('');
    const [note, setNote] = useState('');
    const [procedures, setProcedures] = useState([]);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState();
    const [Estimated, setEstimated] = useState('')
    const [insurance, setInsurance] = useState()
    const [searchQuery2, setSearchQuery2] = useState("");




    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const saveNotesToServer = async () => {
        if (!treatmentDescription || treatmentDescription.trim() === '') {
            notification.error({
                message: 'Error',
                description: 'Treatment Name cannot be empty.',
                placement: 'bottomRight',
            });
            return;
        }

        if (!selectedProcedure || selectedProcedure.length === 0) {
            notification.error({
                message: 'Error',
                description: 'Please select Procedure Code',
                placement: 'bottomRight',
            });
            return;
        }

        setLoading(true);
        try {

            const response = await controller.createTreatmentPlans({
                name: treatmentDescription,
                description: note,
                procedure: selectedProcedure,
                patient: data.id ? data.id : patientId,
                estimated_cost: Estimated,
                insurance_coverage: insurance
            });


            if (response.status >= 200 && response.status < 300) {
                window.location.reload()
                notification.success({
                    message: 'Success',
                    description: 'Treatment plan successfully created.',
                    placement: 'bottomRight',
                });
                setIsModalVisible(false);
                setSelectedProcedure([]);
                setNote("");
                setTreatmentDescription("");
                handleSuccessAddToServer();
                await handleReadData();
                await processTreatmentPlans();
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error creating treatment plans:', error);
        }
        setLoading(false);
    };






    // const handleReadProcedure = async () => {
    //     try {
    //       const response = await controller.getProcedure(0, '');
    
    //       if (response.status < 250) {
    //         setProcedures(response.json);
    //       }
    //     } catch (e) {
    //       notification.error({
    //         message: "Error",
    //         description: "Server error.",
    //         placement: 'bottomRight',
    //       });
    //     }
    //   };

    // useEffect(() => {
    //     handleReadProcedure()
    // }, []);

    // const handleSearch = useCallback(debounce((value) => {
    //     setSearchQuery2(value);
    // }, 300), []);

    useEffect(() => {
        if (selectedMember) {
            setData(selectedMember);
        }
    }, [selectedMember]);


    return (
        <>
            <Modal
                title="Add Treatment Description "
                open={isModalVisible}
                style={{
                    minWidth: 300,
                    minHeight: 800,
                }}
                footer={null}
                onCancel={handleCancel}
            >
                <div>
                    <div className="div-margin-bottom-top" >
                        <div className="div-margin-bottom-text">
                            Treatment Plan
                        </div>
                        <TextArea
                            className="text-area-custom"
                            rows={4}
                            value={treatmentDescription}
                            onChange={(e) => setTreatmentDescription(e.target.value)}
                            placeholder="Enter Treatment Name"
                        />

                    </div>
                    <div className="div-margin-bottom" >
                        <div className="div-margin-bottom-text">
                            Personalized Treatment Note (Optional)
                        </div>

                        <TextArea
                            className="text-area-custom2"
                            rows={4}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Add a personalized note for the treatment ..." />
                    </div>
                    <div className="div-margin-bottom" >
                        <div className="div-margin-bottom-text">
                            Procedure Code
                        </div>
                        <Select
                            className="select-style1"
                            showSearch
                            placeholder="Select a procedure Code"
                            onChange={(value) => setSelectedProcedure(value)}
                            value={selectedProcedure}
                            // onSearch={handleSearch}
                            filterOption={false} // Disable built-in filtering to rely on server-side filtering
                        >
                            {procedures.map((procedure) => (
                                <Option key={procedure.id} value={procedure.id}>
                                    {`Procedure Code: ${procedure.procedure_code ? procedure.procedure_code : "-"}`}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <div className="div-margin-bottom" >
                                <div className="div-margin-bottom-text">
                                    Estimated Cost
                                </div>
                                <TextArea
                                    className="text-area-custom"
                                    rows={4}
                                    value={Estimated}
                                    onChange={(e) => setEstimated(e.target.value)}
                                    placeholder="Enter Estimated Cost"
                                />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="div-margin-bottom" >
                                <div className="div-margin-bottom-text">
                                    Insurance Coverage
                                </div>
                                <TextArea
                                    className="text-area-custom"
                                    rows={4}
                                    value={insurance}
                                    onChange={(e) => setInsurance(e.target.value)}
                                    placeholder="Enter Insurance Coverage"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="flex-margin-right-15">
                    <Button
                        className="button-primary-fixed-width"
                        type="primary"
                        onClick={saveNotesToServer}
                        loading={loading}
                    >
                        Done
                    </Button>
                </div>
            </Modal >
        </>
    );
};

export default ModalStep3;