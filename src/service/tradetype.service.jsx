import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/tradetype', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/tradetype/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addTradetype = async (body) => {
    try {
        const response = await serverCall.post('/tradetype', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateTradetype = async (id, body) => {
    try {
        const response = await serverCall.patch(`/tradetype/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTradetype = async (id) => {
    try {
        const response = await serverCall.delete(`/tradetype/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Tradetypeservice = {
    getList, addTradetype, getByid, updateTradetype, deleteTradetype
};

export default Tradetypeservice;
