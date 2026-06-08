import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/tradeoffer', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/tradeoffer/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addTradeoffer = async (body) => {
    try {
        const response = await serverCall.post('/tradeoffer', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateTradeoffer = async (id, body) => {
    try {
        const response = await serverCall.patch(`/tradeoffer/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTradeoffer = async (id) => {
    try {
        const response = await serverCall.delete(`/tradeoffer/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Tradeofferservice = {
    getList, addTradeoffer, getByid, updateTradeoffer, deleteTradeoffer
};

export default Tradeofferservice;
