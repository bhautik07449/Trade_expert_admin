import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/requestsamples')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/requestsamples/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addResquestSample = async (body) => {
    try {
        const response = await serverCall.post('/requestsamples', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateResquestSample = async (id, body) => {
    try {
        const response = await serverCall.patch(`/requestsamples/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteResquestSample = async (id) => {
    try {
        const response = await serverCall.delete(`/requestsamples/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const ResquestSampleservice = {
    getList, addResquestSample, getByid, updateResquestSample, deleteResquestSample
};

export default ResquestSampleservice;
