import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/homebanner')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/homebanner/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addHomeBanner = async (body) => {
    try {
        const response = await serverCall.post('/homebanner', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateHomeBanner = async (id, body) => {
    try {
        const response = await serverCall.patch(`/homebanner/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteHomeBanner = async (id) => {
    try {
        const response = await serverCall.delete(`/homebanner/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Homebannerservice = {
    getList, addHomeBanner, getByid, updateHomeBanner, deleteHomeBanner
};

export default Homebannerservice;
