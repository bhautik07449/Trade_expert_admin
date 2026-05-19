import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/career')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/career/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addCareer = async (body) => {
    try {
        const response = await serverCall.post('/career', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateCareer = async (id, body) => {
    try {
        const response = await serverCall.patch(`/career/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteCareer = async (id) => {
    try {
        const response = await serverCall.delete(`/career/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const CareerService = {
    getList, addCareer, getByid, updateCareer, deleteCareer
};

export default CareerService;
