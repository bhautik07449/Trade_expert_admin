import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/creditaccount', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/creditaccount/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addCreditaccount = async (body) => {
    try {
        const response = await serverCall.post('/creditaccount', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateCreditaccount = async (id, body) => {
    try {
        const response = await serverCall.patch(`/creditaccount/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteCreditaccount = async (id) => {
    try {
        const response = await serverCall.delete(`/creditaccount/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Creditaccountservice = {
    getList, addCreditaccount, getByid, updateCreditaccount, deleteCreditaccount
};

export default Creditaccountservice;
