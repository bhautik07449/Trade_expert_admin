import serverCall from "../serverCall";

const getMembership = async (country) => {
    try {
        const response = serverCall.get('/membership', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getMembershipByid = async (id) => {
    try {
        const response = serverCall.get(`/membership/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addMembership = async (body) => {
    try {
        const response = await serverCall.post('/membership', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateMembership = async (id, body) => {
    try {
        const response = await serverCall.patch(`/membership/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteMembership = async (id) => {
    try {
        const response = await serverCall.delete(`/membership/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const getAffiliation = async (country) => {
    try {
        const response = serverCall.get('/affiliation', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getAffiliationByid = async (id) => {
    try {
        const response = serverCall.get(`/affiliation/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addAffiliation = async (body) => {
    try {
        const response = await serverCall.post('/affiliation', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateAffiliation = async (id, body) => {
    try {
        const response = await serverCall.patch(`/affiliation/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteAffiliation = async (id) => {
    try {
        const response = await serverCall.delete(`/affiliation/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const ResourcesService = {
    getMembership, addMembership, getMembershipByid, updateMembership, deleteMembership,
    getAffiliation, addAffiliation, getAffiliationByid, updateAffiliation, deleteAffiliation
};

export default ResourcesService;
