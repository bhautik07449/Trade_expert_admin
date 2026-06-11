import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/client', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/client/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addClient = async (body) => {
    try {
        const response = await serverCall.post('/client', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateClient = async (id, body) => {
    try {
        const response = await serverCall.patch(`/client/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteClient = async (id) => {
    try {
        const response = await serverCall.delete(`/client/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Clientservice = {
    getList, addClient, getByid, updateClient, deleteClient
};

export default Clientservice;
