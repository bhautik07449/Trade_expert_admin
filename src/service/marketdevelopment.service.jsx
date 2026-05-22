import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/marketdevelopment')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/marketdevelopment/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addMarketDevelopment = async (body) => {
    try {
        const response = await serverCall.post('/marketdevelopment', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateMarketDevelopment = async (id, body) => {
    try {
        const response = await serverCall.patch(`/marketdevelopment/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteMarketDevelopment = async (id) => {
    try {
        const response = await serverCall.delete(`/marketdevelopment/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const MarketDevelopmentservice = {
    getList, addMarketDevelopment, getByid, updateMarketDevelopment, deleteMarketDevelopment
};

export default MarketDevelopmentservice;