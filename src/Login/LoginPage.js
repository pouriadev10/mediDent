import React, { useState, useEffect } from "react";
import LoginLayout from "./component/LoginLayout";
import { Spin } from "antd";
// components page
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import InviteUserSignUp from "./component/InviteUserSignUp";
import MultipleOffice from "./component/MultipleOffice";
import CreatePractice from "./component/CreatePractice";
import CreateOfficePractice from "./component/CreateOfficePractice";
import UpdatePractice from "./component/UpdatePractice";
import UpdateOfficePractice from "./component/UpdateOfficePractice";
import CreateOffice from "./component/CreateOffice";
import UpdateOffice from "./component/UpdateOffice";
import CreateBankAccount from "./component/CreateBankAccount";
import EnableBank from "./component/EnableBank";
import DisplayBankAccount from "./component/DisplayBankAccount";
import InviteUsers from "./component/InviteUsers";
import Purchase from "./component/Purchase";
import AddNewOffice from "./component/AddNewOffice";
import ForgetPass from "./ForgetPass";
import { controller } from "./controller";

const LoginPage = () => {
    const [mood, setMood] = useState("loading");
    const [practiceId, setPracticeId] = useState("-1");
    const [officeId, setOfficeId] = useState("-1");
    // moods :
    /*
        0. loading
        1. login
        2. sign up
        3. multipleOffice
        4. createPractice - createOfficePractice
        5. UpdatePractice - UpdateOfficePractice
        6. CreateOffice
        7. UpdateOffice
        8. configureBanking
        9. enableBank
        10. displayBankAccount
        11. InviteUsers
        12. Purchase
    */
    const goToSignUpPage = () => {
        setMood("signUp")
    }

    const goToLoginPage = () => {
        setMood("login")
    }

    const readOnboardingStatus = async () => {
        // invited user 
        if (window.location.href.includes("?token=")) {
            setMood("InviteUserSignUp")
        } else {

            // check user is login
            setMood("loading")
            if (localStorage.getItem("user")) {
                const response = await controller.getOnboardingSteps();

                const onboarding_name = response.result.length == 0 ? "completed" : response.result[0].onboarding_step_name;
                const practiceId = response.result.length == 0 ? null : response.result[0].organizations[0];
                const officeId = response.result.length == 0 ? null : response.result[0].branches[0];
                localStorage.removeItem("selectedOffice")
                localStorage.setItem("selectedOffice", officeId)

                if (practiceId)
                    setPracticeId(practiceId)
                if (officeId)
                    setOfficeId(officeId)
                if (onboarding_name == "signed_up") {
                    setMood("multipleOffice")
                } else if (onboarding_name == "create_office_practice_start") {
                    setMood("createOfficePractice")
                } else if (onboarding_name == "office_practice_created") {
                    setMood("UpdateOfficePractice")
                }
                else if (onboarding_name == "create_practice_start") {
                    setMood("createPractice")
                } else if (onboarding_name == "practice_created") {
                    setMood("UpdatePractice")
                } else if (onboarding_name == "practice_updated") {
                    setMood("CreateOffice")
                } else if (onboarding_name == "office_created") {
                    setMood("UpdateOffice")
                } else if (onboarding_name == "office_updated" || onboarding_name == "office_practice_updated") {
                    setMood("configureBanking")
                } else if (onboarding_name == "connected_account_created") {
                    setMood("enableBank")
                } else if (onboarding_name == "connected_account_enabled") {
                    setMood("displayBankAccount")
                } else if (onboarding_name == "invite_users") {
                    setMood("InviteUsers")
                }
                else if (onboarding_name == "invite_users_skipped") {
                    // test
                    setMood("AddNewOffice")
                }
                else if (onboarding_name == "users_invited") {
                    setMood("Purchase")

                } else if (onboarding_name == "completed") {
                    setMood("Done")
                }
            } else {
                setMood("login")
            }
        }

    }

    useEffect(() => {
        console.log(mood);
    }, [mood]);

    useEffect(() => {
        readOnboardingStatus();
    }, [])


    const ChangeModeToInvite = () => {
        setMood("InviteUsers")
    }

    const goToForgetPass = () => {
        setMood("forgetPass")
    }


    return (
        <>
            <LoginLayout >

                {
                    mood == "login" ?
                        <Login goToForgetPass={goToForgetPass} goToSignUpPage={goToSignUpPage} readOnboardingStatus={readOnboardingStatus} />
                        :
                        mood == "signUp" ?
                            <SignUp goToLoginPage={goToLoginPage} />
                            :
                            mood == "InviteUserSignUp" ?
                                <InviteUserSignUp goToLoginPage={goToLoginPage} />
                                :
                                mood == "multipleOffice" ?
                                    <MultipleOffice readOnboardingStatus={readOnboardingStatus} practiceId={practiceId} />
                                    :
                                    mood == "createOfficePractice" ?
                                        <CreateOfficePractice readOnboardingStatus={readOnboardingStatus} />
                                        :
                                        mood == "createPractice" ?
                                            <CreatePractice readOnboardingStatus={readOnboardingStatus} />
                                            :
                                            mood == "UpdatePractice" ?
                                                <UpdatePractice readOnboardingStatus={readOnboardingStatus} practiceId={practiceId} />
                                                :
                                                mood == "UpdateOfficePractice" ?
                                                    <UpdateOfficePractice readOnboardingStatus={readOnboardingStatus} practiceId={practiceId} />
                                                    :
                                                    mood == "CreateOffice" ?
                                                        <CreateOffice readOnboardingStatus={readOnboardingStatus} practiceId={practiceId} />
                                                        :
                                                        mood == "UpdateOffice" ?
                                                            <UpdateOffice officeId={officeId} readOnboardingStatus={readOnboardingStatus} practiceId={practiceId} />
                                                            :
                                                            mood == "configureBanking" ?
                                                                <CreateBankAccount officeId={officeId} readOnboardingStatus={readOnboardingStatus} practiceId={practiceId} />
                                                                :
                                                                mood == "enableBank" ?
                                                                    <EnableBank />
                                                                    :
                                                                    mood == "displayBankAccount" ?
                                                                        <DisplayBankAccount ChangeModeToInvite={ChangeModeToInvite} />
                                                                        :
                                                                        mood == "InviteUsers" ?
                                                                            <InviteUsers readOnboardingStatus={readOnboardingStatus} />
                                                                            :
                                                                            mood == "AddNewOffice" ?
                                                                                <AddNewOffice readOnboardingStatus={readOnboardingStatus} />
                                                                                :
                                                                                mood == "Purchase" ?
                                                                                    <Purchase readOnboardingStatus={readOnboardingStatus} />
                                                                                    :
                                                                                    mood == "forgetPass" ?
                                                                                        <ForgetPass goToLoginPage={goToLoginPage} readOnboardingStatus={readOnboardingStatus} goToSignUpPage={goToSignUpPage} />
                                                                                        :
                                                                                        mood == "loading" ?
                                                                                            <Spin />
                                                                                            :
                                                                                            mood == "completed" ?
                                                                                                <Spin />
                                                                                                :
                                                                                                <div>-</div>
                }

            </LoginLayout>
        </>
    )
}

export default LoginPage;