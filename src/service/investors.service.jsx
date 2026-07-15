import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/investors', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/investors/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addInvestor = async (body) => {
    try {
        const response = await serverCall.post('/investors', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateInvestor = async (id, body) => {
    try {
        const response = await serverCall.patch(`/investors/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteInvestor = async (id) => {
    try {
        const response = await serverCall.delete(`/investors/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Investorservice = {
    getList, addInvestor, getByid, updateInvestor, deleteInvestor
};

export default Investorservice;
