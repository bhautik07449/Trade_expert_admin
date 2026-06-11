import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/newsletter')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/newsletter/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addNewsletter = async (body) => {
    try {
        const response = await serverCall.post('/newsletter', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateNewsletter = async (id, body) => {
    try {
        const response = await serverCall.patch(`/newsletter/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteNewsletter = async (id) => {
    try {
        const response = await serverCall.delete(`/newsletter/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Newsletterservice = {
    getList, addNewsletter, getByid, updateNewsletter, deleteNewsletter
};

export default Newsletterservice;
