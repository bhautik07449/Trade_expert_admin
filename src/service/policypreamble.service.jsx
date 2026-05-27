import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/policypreamble', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/policypreamble/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addPolicypreamble = async (body) => {
    try {
        const response = await serverCall.post('/policypreamble', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updatePolicypreamble = async (id, body) => {
    try {
        const response = await serverCall.patch(`/policypreamble/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deletePolicypreamble = async (id) => {
    try {
        const response = await serverCall.delete(`/policypreamble/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Policypreambleservice = {
    getList, addPolicypreamble, getByid, updatePolicypreamble, deletePolicypreamble
};

export default Policypreambleservice;
