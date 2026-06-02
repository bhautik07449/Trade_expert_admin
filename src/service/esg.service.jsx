import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/esg', { params: country ? { country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/esg/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addESG = async (body) => {
    try {
        const response = await serverCall.post('/esg', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateESG = async (id, body) => {
    try {
        const response = await serverCall.patch(`/esg/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteESG = async (id) => {
    try {
        const response = await serverCall.delete(`/esg/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const ESGService = {
    getList, addESG, getByid, updateESG, deleteESG
};

export default ESGService;
