import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/upcoming_collaboration', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/upcoming_collaboration/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addUpcomingCollaboration = async (body) => {
    try {
        const response = await serverCall.post('/upcoming_collaboration', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateUpcomingCollaboration = async (id, body) => {
    try {
        const response = await serverCall.patch(`/upcoming_collaboration/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteUpcomingCollaboration = async (id) => {
    try {
        const response = await serverCall.delete(`/upcoming_collaboration/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const UpcomingCollaborationService = {
    getList, addUpcomingCollaboration, getByid, updateUpcomingCollaboration, deleteUpcomingCollaboration
};

export default UpcomingCollaborationService;
