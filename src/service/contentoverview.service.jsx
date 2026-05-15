import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/contentoverview')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/contentoverview/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addContentOverview = async (body) => {
    try {
        const response = await serverCall.post('/contentoverview', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateContentOverview = async (id, body) => {
    try {
        const response = await serverCall.patch(`/contentoverview/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteContentOverview = async (id) => {
    try {
        const response = await serverCall.delete(`/contentoverview/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const ContentOverviewservice = {
    getList, addContentOverview, getByid, updateContentOverview, deleteContentOverview
};

export default ContentOverviewservice;
