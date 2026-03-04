import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/measurements')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/measurements/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addMeasurements = async (body) => {
    try {
        const response = await serverCall.post('/measurements', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateMeasurements = async (id, body) => {
    try {
        const response = await serverCall.patch(`/measurements/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteMeasurements = async (id) => {
    try {
        const response = await serverCall.delete(`/measurements/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Measurementsservice = {
    getList, addMeasurements, getByid, updateMeasurements, deleteMeasurements
};

export default Measurementsservice;
