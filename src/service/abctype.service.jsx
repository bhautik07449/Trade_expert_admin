import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/abctype')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/abctype/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addAbctype = async (body) => {
    try {
        const response = await serverCall.post('/abctype', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateAbctype = async (id, body) => {
    try {
        const response = await serverCall.patch(`/abctype/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteAbctype = async (id) => {
    try {
        const response = await serverCall.delete(`/abctype/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Abctypeservice = {
    getList, addAbctype, getByid, updateAbctype, deleteAbctype
};

export default Abctypeservice;
