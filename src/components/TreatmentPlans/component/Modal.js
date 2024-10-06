import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import ModalStep1 from "./ModalStep1";
import ModalStep2 from "./ModalStep2";

function ModalComponent({ isModalVisible, setIsModalVisible, list, data1, filter, setSearchQuery }) {
  const [modalStep, setModalStep] = useState(1);
  const [item, setitems] = useState([]);
  const [data, setdata] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [filterdata, setFilterData] = useState([]);



  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    setModalStep(modalStep + 1);
  };

  const nextModalStep = () => {
    setModalStep(modalStep + 1);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalStep(1);
  };

  useEffect(() => {
    if (filter) {
      setFilterData(filter);
    }
  }, [filter]);


  useEffect(() => {
    if (list) {
      setitems(list);
    }
  }, [list]);

  useEffect(() => {
    console.log("data1")
    console.log(data1)
    if (data1) {
      setdata(data1);
    }
  }, [data1]);

  return (
    <Modal
      title={modalStep === 2 || 1 ? "Add new Treatment Plan" : ""}
      visible={isModalVisible}
      style={{
        minWidth: modalStep === 2 ? 900 : modalStep === 1 || 3 ? 900 : 700,
        minHeight: 500,
      }}
      footer={null}
      onCancel={handleCancel}
    >
      {modalStep === 1 && <ModalStep1 nextModalStep={nextModalStep} item={data} handleMemberSelect={handleMemberSelect} />}
      {modalStep === 2 && selectedMember && <ModalStep2
        handleCancel={handleCancel}
        item1={item}
        data1={data}
        selectedMember={selectedMember}
        filterdata={filterdata}
        setSearchQuery={setSearchQuery} />}
      {modalStep === 2 && (
        <div className={modalStep === 1 ? "flex-margin-right" : "flex-end-container"}>
          <Button
            className="button-primary-fixed-width"
            type="primary"
            onClick={modalStep === 1 ? handleMemberSelect : handleCancel}
          >
            Done
          </Button>
        </div>
      )}
    </Modal>
  );
}

export default ModalComponent;
