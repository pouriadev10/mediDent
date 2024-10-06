import {
    Button,
    Divider,
    Modal,
    Pagination,
    Popconfirm,
    Row,
    Table,
    notification,
    Typography
} from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { dashboardActions } from "../../actions";
import { controller } from "../../controller";
import DashboardLayout from "../../layout/dashboardLayout/DashboardLayout";
import CreateNewHealthCategory from "./CreateNewHealthCategory";
import EditHealthCategory from "./EditHealthCategory";
import "./style.css";

const openNotification = (placement, message, status) => {
    if (status && status.toLowerCase().search("success") != -1) {
        notification.success({
            message: status,
            description: message,
            placement,
        });
    } else if (status && status.toLowerCase().search("error") != -1) {
        notification.error({
            message: status,
            description: message,
            placement,
        });
    } else {
        notification.info({
            message: status,
            description: message,
            placement,
        });
    }
};

class HealthCategories extends Component {


    constructor(props) {
        super(props);
        this.getLogo();
        this.getData();
        this.state = {
            currentPage: 1,
            page_size: 1,
            page: 1,
            data: [],
            loading: true,
            openModal: false,
            editedRecord: {},
            visibleEdit: false
        };
        this.handleCreateNewCategory = this.handleCreateNewCategory.bind(this);
        this.handleEditCategory = this.handleEditCategory.bind(this);
        this.openModalEdit = this.openModalEdit.bind(this);
        this.getLogo = this.getLogo.bind(this);
        this.getData = this.getData.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleOpenModalNewCategory = this.handleOpenModalNewCategory.bind(this);
        this.props.dispatch(dashboardActions.fetchProfileSummary());
    }

    openModalEdit = (record) => {
        console.log(record)
        this.setState({
            editedRecord: record,
            visibleEdit: true
        })
    }

    handleRemove = async (id) => {
        const response = await controller.DeleteHealthCategory(id);
        if (response.status < 250) {
            openNotification("bottom", "Removed", "Successful")
            this.setState({

                loading: true
            })
            const response = await controller.getHealthCategory(this.state.currentPage);
            if (response.status < 250) {
                this.setState({
                    page: 1,
                    page_size: response.json.count,
                    data: response.json.results,
                    loading: false
                });
            }
        } else {
            openNotification("bottom", "Error", "Error");
        }
    }

    handleEditSuccessfully = async () => {

        this.setState({
            visibleEdit: false,
            loading: true
        })
        const response = await controller.getHealthCategory(this.state.currentPage);
        if (response.status < 250) {
            this.setState({
                page: 1,
                page_size: response.json.count,
                data: response.json.results,
                loading: false
            });
        }
    }

    handleCreateNewCategory = async () => {

        this.setState({
            openModal: false,
            loading: true
        })
        const response = await controller.getHealthCategory(this.state.currentPage);
        if (response.status < 250) {
            this.setState({
                page: 1,
                page_size: response.json.count,
                data: response.json.results,
                loading: false
            });
        }
    }

    handleEditCategory = async () => {

        this.setState({
            openModal: false,
            loading: true
        })
        const response = await controller.getHealthCategory(this.state.currentPage);
        if (response.status < 250) {
            this.setState({
                page: 1,
                page_size: response.json.count,
                data: response.json.results,
                loading: false
            });
        }
    }

    handleOpenModalNewCategory = () => {
        this.setState({
            openModal: true
        })
    }

    getData = async () => {
        this.setState({
            loading: true
        })
        const response = await controller.getHealthCategory(1);
        console.log(response.json)
        this.setState({
            data: response.json.results,
            page: 1,
            currentPage: 1,
            loading: false,
            page_size: response.json.count,
        })
    };

    handlePageChange = async (page) => {
        this.setState({
            currentPage: page,
            loading: true
        });

        const response = await controller.getHealthCategory(page);
        if (response.status < 250) {
            this.setState({
                page: 1,
                loading: false,
                page_size: response.json.count,
                data: response.json.results,
            });
        }
    };

    getLogo = async () => {
        const response = await controller.getLogo();
        this.setState({ serverLogo: response.data.dark });
    };



    render() {
        const { profileSummary } = this.props;
        var columns = [
            {
                title: "ID",
                render: (_, record) => {
                    return (
                        <>
                            {record.id ?
                                record.id
                                : "-"}
                        </>
                    );
                },
            },
            {
                title: "Name",
                render: (_, record) => {
                    return (
                        <>
                            {record.name
                                ? record.name
                                : "-"}
                        </>
                    );
                },
            },
            {
                title: "Importance Factor",
                render: (_, record) => {
                    return (
                        <>
                            {record.importance_factor
                                ? record.importance_factor
                                : "-"}
                        </>
                    );
                },
            },
            {
                title: "Action",
                render: (_, record) => {
                    return (
                        <>
                            <Typography.Text
                                className="appointment_edit"
                                onClick={() => {
                                    this.openModalEdit(
                                        record
                                    );
                                }}
                            >
                                Edit
                            </Typography.Text>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="Are you sure to remove this category?"
                                onConfirm={() => {
                                    this.handleRemove(record.id);
                                }}
                            >
                                <Typography.Text className="delete-row">
                                    Delete
                                </Typography.Text>
                            </Popconfirm>
                        </>
                    );
                },
            },
        ];
        return (
            <DashboardLayout
                breadCrumb={"HealthCategories"}
                logo={profileSummary && profileSummary.logo ? profileSummary.logo : ""}
                footerLogo={this.state.serverLogo}
            >

                <div className="paymentRequestContent">
                    <Row type="flex" justify="end">
                        <Button
                            className="login-btn create-payment-request-btn cw"
                            onClick={this.handleOpenModalNewCategory}
                            size="large"
                        >
                            + New
                        </Button>

                    </Row>
                    <Table
                        loading={this.state.loading}
                        columns={columns}
                        dataSource={this.state.data}
                        style={{ marginTop: "15px" }}
                        pagination={false}
                    />
                    <Row type="flex" justify="end" className="mt15">
                        <Pagination
                            showSizeChanger={false}
                            hideOnSinglePage={true}
                            current={this.state.currentPage}
                            total={this.state.page_size}
                            onChange={this.handlePageChange}
                            className="paginator"
                            size="small"
                        />
                    </Row>
                </div>

                <Modal
                    footer={null}
                    title="Create New Category"
                    open={this.state.openModal}
                    onCancel={() => {
                        this.setState({
                            openModal: false,
                        });
                    }}
                >
                    <CreateNewHealthCategory
                        createSuccessFully={this.handleCreateNewCategory}
                        closeModal={() => {
                            this.setState({
                                openModal: false,
                            });
                        }} />
                </Modal>

                <Modal
                    footer={null}
                    title={
                        this.state.editedRecord.name ?
                            <span>Edit <b>{this.state.editedRecord.name}</b></span>
                            : "Edit "
                    }
                    open={this.state.visibleEdit}
                    onCancel={() => {
                        this.setState({
                            visibleEdit: false,
                        });
                    }}
                >
                    <EditHealthCategory
                        data={this.state.editedRecord}
                        EditSuccessFully={this.handleEditSuccessfully}
                        closeModal={() => {
                            this.setState({
                                visibleEdit: false,
                            });
                        }}
                    />
                </Modal>

            </DashboardLayout>
        );
    }
}

function mapStateToProps(state) {
    const { creating, error } = state.paymentRequest;
    const { profileSummary } = state.dashboard;
    return {
        creating,
        error,
        profileSummary,
    };
}

const connectedAppointment = connect(mapStateToProps)(HealthCategories);

export default connectedAppointment;
