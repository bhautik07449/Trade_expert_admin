import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/offerrequest')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/offerrequest/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addTraderequest = async (body) => {
    try {
        const response = await serverCall.post('/offerrequest', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateTraderequest = async (id, body) => {
    try {
        const response = await serverCall.patch(`/offerrequest/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTraderequest = async (id) => {
    try {
        const response = await serverCall.delete(`/offerrequest/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Traderequestservice = {
    getList, addTraderequest, getByid, updateTraderequest, deleteTraderequest
};

export default Traderequestservice;
