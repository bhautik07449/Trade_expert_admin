import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/abc', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/abc/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addAbc = async (body) => {
    try {
        const response = await serverCall.post('/abc', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateAbc = async (id, body) => {
    try {
        const response = await serverCall.patch(`/abc/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteAbc = async (id) => {
    try {
        const response = await serverCall.delete(`/abc/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const AbcService = {
    getList, addAbc, getByid, updateAbc, deleteAbc
};

export default AbcService;
