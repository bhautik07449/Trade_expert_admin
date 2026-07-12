import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/franchise', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/franchise/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addFranchise = async (body) => {
    try {
        const response = await serverCall.post('/franchise', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateFranchise = async (id, body) => {
    try {
        const response = await serverCall.patch(`/franchise/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteFranchise = async (id) => {
    try {
        const response = await serverCall.delete(`/franchise/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Franchiseservice = {
    getList, addFranchise, getByid, updateFranchise, deleteFranchise
};

export default Franchiseservice;
