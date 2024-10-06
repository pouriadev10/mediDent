import React, { useEffect } from "react";
import { controller } from "../controller";
import Helcim from "./Helcim"
const HelcimForm = () => {
    const [helcimConfig, setHelcimConfig] = React.useState({})
    const readData = async () => {
        const response = await controller.getHelcimToken();
        console.log(response)
        setHelcimConfig(response)
    }

    React.useEffect(() => {
        readData()
    }, [])

    return (
        <>
            <Helcim helcimConfig={helcimConfig} />
        </>
    )
}
export default HelcimForm;