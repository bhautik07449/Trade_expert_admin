import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/tradehistory', { params: country ? { country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/tradehistory/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addTradeHistory = async (body) => {
    try {
        const response = await serverCall.post('/tradehistory', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateTradeHistory = async (id, body) => {
    try {
        const response = await serverCall.patch(`/tradehistory/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTradeHistory = async (id) => {
    try {
        const response = await serverCall.delete(`/tradehistory/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const TradeHistoryservice = {
    getList, addTradeHistory, getByid, updateTradeHistory, deleteTradeHistory
};

export default TradeHistoryservice;