import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/request_info', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/request_info/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addRequestInfo = async (body) => {
    try {
        const response = await serverCall.post('/request_info', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateRequestInfo = async (id, body) => {
    try {
        const response = await serverCall.patch(`/request_info/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteRequestInfo = async (id) => {
    try {
        const response = await serverCall.delete(`/request_info/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const RequestInfoService = {
    getList, addRequestInfo, getByid, updateRequestInfo, deleteRequestInfo
};

export default RequestInfoService;