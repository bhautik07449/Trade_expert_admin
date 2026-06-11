import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/dmr', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/dmr/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addDMR = async (body) => {
    try {
        const response = await serverCall.post('/dmr', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateDMR = async (id, body) => {
    try {
        const response = await serverCall.patch(`/dmr/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteDMR = async (id) => {
    try {
        const response = await serverCall.delete(`/dmr/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const DMRservice = {
    getList, addDMR, getByid, updateDMR, deleteDMR
};

export default DMRservice;
