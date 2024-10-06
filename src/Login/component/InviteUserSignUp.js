import React, { useState } from "react";
import {
    Input,
    Button,
    Modal,
    Row,
    message
} from "antd"
import { controller } from "../controller";
import { PopupMessage } from "./PopupMessage";

const SignUp = (props) => {
    const [loading, setLoading] = useState(false)


    const [data, setData] = useState({
        password1: "",
        password2: "",
        email: "",
    })

    const [openModal, setOpenModal] = useState(false)

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleCreate = async () => {
        setLoading(true)
        data["token"] = window.location.href.split("?token=")[1]
        const response = await controller.SignUp(data);
        if (response.status < 250) {
            setOpenModal(true)
            message.success("Register was successful")
            window.location.href = "#/"
        } else {
            message.error(
                response.detail ? response.detail
                    : response.email ? response.email
                        : response.password1 ? response.password1
                            : response.password2 ? response.password2
                                : "Error")

        }
        setLoading(false)
    }

    const handleDone = () => {
        props.goToLoginPage()
    }

    const handleGoToLoginPage = () => {
        props.goToLoginPage()
    }

    return (
        <>
            <div>
                <p className="login-title">Create an account</p>
                <p className="login-subtitle" onClick={handleGoToLoginPage}>I have an account</p>
            </div>

            <div className="mt8p">
                <div className="input-lable">Email</div>
                <Input placeholder="Enter Email" onChange={handleChange} name="email" value={data.email} />

                <div className="input-lable mt20">Password</div>
                <Input type="password" placeholder="Enter Password" onChange={handleChange} name="password1" value={data.password1} />

                <div className="input-lable mt20">Confirm Password</div>
                <Input type="password" placeholder="Enter Password Again" onChange={handleChange} name="password2" value={data.password2} />
            </div>

            <div className="mt10p">
                <Button loading={loading} className="login-button" onClick={handleCreate}>
                    Create Account
                </Button>
                {/* <div>
                    <p className="forgotpass-text">Forget Password?</p>
                </div> */}
            </div>


            <Modal
                title=""
                open={openModal}
                footer={null}
                onCancel={() => {
                    setOpenModal(false)
                }}
                centered={true}
            >
                <div>
                    <p className="modal-titr">Verify your Email</p>
                </div>
                <div>
                    <p className="modal-sub-titr">You need to verify your Email address to login.</p>
                </div>

                <Button className="done-button" loading={loading} onClick={handleDone} >
                    {
                        !loading ? "Done" : "Done..."
                    }
                </Button>


                {/* <Row justify={"space-between"} className="mt10">
                    <p className="recive-sms-title">Did not receive the code? </p>
                    <p className="recive-sms-text">Resend code</p>
                </Row> */}

            </Modal>
        </>
    )
}

export default SignUp;