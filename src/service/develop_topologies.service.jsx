import serverCall from "../serverCall";

const getDevelopTopologies = async () => {
    try {
        const response = await serverCall.get('/develop-topologies');
        return response;
    } catch (error) {
        throw error;
    }
}

const getDevelopTopologyById = async (id) => {
    try {
        const response = await serverCall.get(`/develop-topologies/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const addDevelopTopology = async (data) => {
    try {
        const response = await serverCall.post('/develop-topologies', data);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateDevelopTopology = async (id, data) => {
    try {
        const response = await serverCall.patch(`/develop-topologies/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteDevelopTopology = async (id) => {
    try {
        const response = await serverCall.delete(`/develop-topologies/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const DevelopTopologiesService = {
    getDevelopTopologies,
    getDevelopTopologyById,
    addDevelopTopology,
    updateDevelopTopology,
    deleteDevelopTopology
};

export default DevelopTopologiesService;
