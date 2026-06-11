import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/analytical', {
            params: country ? { country: country } : {}
        })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/analytical/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addAnalytical = async (body) => {
    try {
        const response = await serverCall.post('/analytical', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateAnalytical = async (id, body) => {
    try {
        const response = await serverCall.patch(`/analytical/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteAnalytical = async (id) => {
    try {
        const response = await serverCall.delete(`/analytical/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Analyticalservice = {
    getList, addAnalytical, getByid, updateAnalytical, deleteAnalytical
};

export default Analyticalservice;
