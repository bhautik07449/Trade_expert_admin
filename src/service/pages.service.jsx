import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/pages')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/pages/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addPage = async (body) => {
    try {
        const response = await serverCall.post('/pages', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updatePage = async (id, body) => {
    try {
        const response = await serverCall.patch(`/pages/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deletePage = async (id) => {
    try {
        const response = await serverCall.delete(`/pages/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Pageservice = {
    getList, addPage, getByid, updatePage, deletePage
};

export default Pageservice;
