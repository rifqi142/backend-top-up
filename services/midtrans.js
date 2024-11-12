const axios = require("axios");

const serverKey = process.env.MIDTRANS_SERVER_KEY;
const baseUrl = process.env.MIDTRANS_BASE_URL;
const snapUrl = process.env.MIDTRANS_SNAP_URL;

const midtransCreateSnapTransaction = async (transactionDetails) => {
    try {
        const response = await axios.post(`${snapUrl}/transactions`, transactionDetails, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(serverKey + ":").toString("base64")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw new Error(error.response.data.message || "Failed to create snap transaction");
    }
};
const midtransCreateTransaction = async (transactionDetails) => {
    try {
        const response = await axios.post(`${baseUrl}/charge`, transactionDetails, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(serverKey + ":").toString("base64")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw new Error(error.response.data.message || "Failed to create transaction");
    }
};
const midtransVerifyTransaction = async (orderId) => {
    try {
        const response = await axios.get(`${baseUrl}/${orderId}/status`, {
            headers: {
                Authorization: `Basic ${Buffer.from(serverKey + ":").toString("base64")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw new Error(error.response.data.message || "Failed to verify transaction");
    }
};
const midtransCancelTransaction = async (orderId) => {
    try {
        const response = await axios.post(
            `${baseUrl}/${orderId}/cancel`,
            {},
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Basic ${Buffer.from(serverKey + ":").toString("base64")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw new Error(error.response.data.message || "Failed to Cancel Transaction");
    }
};

module.exports = { midtransCreateSnapTransaction, midtransCreateTransaction, midtransVerifyTransaction, midtransCancelTransaction };
