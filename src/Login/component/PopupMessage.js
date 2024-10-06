import { notification } from "antd";

const openNotification = (placement, message, status) => {
    if (status && status.toLowerCase().search("success") != -1) {
        notification.success({
            message: "",
            description: message,
            placement,
            duration: "200",
        });
    } else if (status && status.toLowerCase().search("error") != -1) {
        notification.error({
            message: "",
            description: message,
            placement,
            duration: "200",
        });
    } else {
        notification.info({
            message: "",
            description: message,
            placement,
            duration: "200",
        });
    }
};

export const PopupMessage = {
    openNotification
};