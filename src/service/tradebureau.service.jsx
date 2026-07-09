import serverCall from "../serverCall";

const getTradeLawList = async (country) => {
    try {
        const response = serverCall.get('/trade_law', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getTradeLawByid = async (id) => {
    try {
        const response = serverCall.get(`/trade_law/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addTradeLaw = async (body) => {
    try {
        const response = await serverCall.post('/trade_law', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateTradeLaw = async (id, body) => {
    try {
        const response = await serverCall.patch(`/trade_law/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTradeLaw = async (id) => {
    try {
        const response = await serverCall.delete(`/trade_law/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const getTradeControllerList = async (country) => {
    try {
        const response = serverCall.get('/trade_controller', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getTradeControllerByid = async (id) => {
    try {
        const response = serverCall.get(`/trade_controller/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addTradeController = async (body) => {
    try {
        const response = await serverCall.post('/trade_controller', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateTradeController = async (id, body) => {
    try {
        const response = await serverCall.patch(`/trade_controller/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTradeController = async (id) => {
    try {
        const response = await serverCall.delete(`/trade_controller/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const TradeBureauService = {
    getTradeLawList, addTradeLaw, getTradeLawByid, updateTradeLaw, deleteTradeLaw,
    getTradeControllerList, addTradeController, getTradeControllerByid, updateTradeController, deleteTradeController
};

export default TradeBureauService;