import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/team')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/team/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addTeam = async (body) => {
    try {
        const response = await serverCall.post('/team', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateTeam = async (id, body) => {
    try {
        const response = await serverCall.patch(`/team/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTeam = async (id) => {
    try {
        const response = await serverCall.delete(`/team/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Teamservice = {
    getList, addTeam, getByid, updateTeam, deleteTeam
};

export default Teamservice;
