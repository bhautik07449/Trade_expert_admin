import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/multilingual', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/multilingual/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addMultilingual = async (body) => {
    try {
        const response = await serverCall.post('/multilingual', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateMultilingual = async (id, body) => {
    try {
        const response = await serverCall.patch(`/multilingual/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteMultilingual = async (id) => {
    try {
        const response = await serverCall.delete(`/multilingual/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Multilingualservice = {
    getList, addMultilingual, getByid, updateMultilingual, deleteMultilingual
};

export default Multilingualservice;
