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

const getMarketData = async () => {
    try {
        const response = serverCall.get('/marketdata')
        return response
    } catch (error) {
        throw error
    }
}

const getMarketDataByid = async (id) => {
    try {
        const response = serverCall.get(`/marketdata/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addMarketData = async (body) => {
    try {
        const response = await serverCall.post('/marketdata', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateMarketData = async (id, body) => {
    try {
        const response = await serverCall.patch(`/marketdata/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteMarketData = async (id) => {
    try {
        const response = await serverCall.delete(`/marketdata/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const MarketDevelopmentservice = {
    getList, addMarketData, getMarketDataByid, updateMarketData, deleteMarketData, getByid, addMarketDevelopment, updateMarketDevelopment, deleteMarketDevelopment, getMarketData
};

export default MarketDevelopmentservice;