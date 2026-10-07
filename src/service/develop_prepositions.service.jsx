import serverCall from "../serverCall";

const getDevelopPrepositions = async () => {
    try {
        const response = await serverCall.get('/develop-prepositions');
        return response;
    } catch (error) {
        throw error;
    }
}

const getDevelopPrepositionById = async (id) => {
    try {
        const response = await serverCall.get(`/develop-prepositions/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const addDevelopPreposition = async (data) => {
    try {
        const response = await serverCall.post('/develop-prepositions', data);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateDevelopPreposition = async (id, data) => {
    try {
        const response = await serverCall.patch(`/develop-prepositions/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteDevelopPreposition = async (id) => {
    try {
        const response = await serverCall.delete(`/develop-prepositions/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const DevelopPrepositionsService = {
    getDevelopPrepositions,
    getDevelopPrepositionById,
    addDevelopPreposition,
    updateDevelopPreposition,
    deleteDevelopPreposition
};

export default DevelopPrepositionsService;
