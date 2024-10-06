import React, { useState, useEffect } from "react";
import PaymentAdminFirstPage from "./PaymentByAdmin/PaymentAdminFirstPage"
const PayByAdmin = ({id, interval}) => {
    return (
        <>
            <PaymentAdminFirstPage paymentId={id} interval={interval} />
        </>
    )
}

export default PayByAdmin;