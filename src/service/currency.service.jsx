import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/currency', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/currency/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addCurrency = async (body) => {
    try {
        const response = await serverCall.post('/currency', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateCurrency = async (id, body) => {
    try {
        const response = await serverCall.patch(`/currency/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteCurrency = async (id) => {
    try {
        const response = await serverCall.delete(`/currency/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Cuurrencyservice = {
    getList, addCurrency, getByid, updateCurrency, deleteCurrency
};

export default Cuurrencyservice;
