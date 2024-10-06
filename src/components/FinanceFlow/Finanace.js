import React, { useState } from "react";
import PersonalInfo from "./pages/PersonalInfo";
import SelectFinanceType from "./pages/SelectFinanceType";
import SelectCard from "./pages/SelectCard";
import QuestionsPriv from "./pages/QuestionsPriv";
import QuestionsGov from "./pages/QuestionsGov";
import LoadingWithAI from "./pages/LoadingWithAI";
import GetServices from "./pages/GetServices";
import DoneService from "./pages/DoneService";
import AcceptTerms from "./pages/AcceptTerms";
import "./style.css"

const Finanace = () => {
    const [stage, setStage] = useState("SelectFinanceType");

    const handleDoneStage = (e) => {
        if (stage == "PersonalInfo") {
            setStage("Terms")
        } else if (stage == "SelectFinanceType") {
            setStage("PersonalInfo")
        }

        else if (stage == "Terms") {
            if (localStorage.getItem("financeType") == "questionsgov") {
                setStage("questionsgov")
            }

            else if (localStorage.getItem("financeType") == "questionspriv") {
                setStage("questionspriv")
            }

            else if (localStorage.getItem("financeType") == "getServices") {
                setStage("getServices")
            }
            else {
                setStage("Loading")
            }


        }

        else if (stage == "getServices") {
            setStage("DoneService")
        }

        else if (stage == "Loading") {
            setStage("SelectCard")
        }

        else if (stage == "questionsgov" || stage == "questionspriv") {
            setStage("Loading")
        }

    }

    const handleBackStage = () => {
        if (stage == "PersonalInfo") {
            setStage("SelectFinanceType")
        } else if (stage == "Terms") {
            setStage("PersonalInfo")
        } else if (stage == "SelectCard") {
            setStage("Terms")
        } else if (stage == "SelectCard" || stage == "questionsgov" || stage == "questionspriv" || stage == "getServices" || stage == "DoneService") {
            setStage("Terms")
        }
    }

    const handleDoneGove = (data) => {
        setStage("PersonalInfo")
        localStorage.setItem("financeType", "questionsgov")
    }
    const handleDoneProvate = (data) => {
        setStage("PersonalInfo")
        localStorage.setItem("financeType", "questionspriv")
    }
    const handleDonePaymentPlant = () => {
        setStage("PersonalInfo")
        localStorage.setItem("financeType", "getServices")
    }

    return (
        stage == "PersonalInfo" ?
            <PersonalInfo handleDoneStage={handleDoneStage} handleBackStage={handleBackStage} />
            :
            stage == "Terms" ?
                <AcceptTerms handleBackStage={handleBackStage} handleDoneStage={handleDoneStage} />
                :
                stage == "SelectFinanceType" ?
                    <SelectFinanceType handleDonePaymentPlant={handleDonePaymentPlant} handleDoneProvate={handleDoneProvate} handleDoneGove={handleDoneGove} handleBackStage={handleBackStage} handleDoneStage={handleDoneStage} />
                    :
                    stage == "SelectCard" ?
                        <SelectCard handleBackStage={handleBackStage} handleDoneStage={handleDoneStage} />
                        :
                        stage == "questionsgov" ?
                            <QuestionsGov handleBackStage={handleBackStage} handleDoneStage={handleDoneStage} />
                            :
                            stage == "questionspriv" ?
                                <QuestionsPriv handleBackStage={handleBackStage} handleDoneStage={handleDoneStage} />
                                :
                                stage == "getServices" ?
                                    <GetServices handleBackStage={handleBackStage} handleDoneStage={handleDoneStage} />
                                    :
                                    stage == "DoneService" ?
                                        <DoneService handleBackStage={handleBackStage} handleDoneStage={handleDoneStage} />
                                        :
                                        <LoadingWithAI handleBackStage={handleBackStage} handleDoneStage={handleDoneStage} />
    )
}

export default Finanace