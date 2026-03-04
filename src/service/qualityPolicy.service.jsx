import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/qualitypolicy')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/qualitypolicy/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addQualityPolicy = async (body) => {
    try {
        const response = await serverCall.post('/qualitypolicy', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateQualityPolicy = async (id, body) => {
    try {
        const response = await serverCall.patch(`/qualitypolicy/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteQualityPolicy = async (id) => {
    try {
        const response = await serverCall.delete(`/qualitypolicy/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const QualityPolicyservice = {
    getList, addQualityPolicy, getByid, updateQualityPolicy, deleteQualityPolicy
};

export default QualityPolicyservice;
