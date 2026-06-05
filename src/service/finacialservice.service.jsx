import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/financialservice')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/financialservice/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addFinancialService = async (body) => {
    try {
        const response = await serverCall.post('/financialservice', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateFinancialService = async (id, body) => {
    try {
        const response = await serverCall.patch(`/financialservice/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteFinancialService = async (id) => {
    try {
        const response = await serverCall.delete(`/financialservice/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const FinancialServiceservice = {
    getList, addFinancialService, getByid, updateFinancialService, deleteFinancialService
};

export default FinancialServiceservice;
