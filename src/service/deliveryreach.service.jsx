import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/deliveryreach', { params: country ? { country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/deliveryreach/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addDeliveryreach = async (body) => {
    try {
        const response = await serverCall.post('/deliveryreach', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateDeliveryreach = async (id, body) => {
    try {
        const response = await serverCall.patch(`/deliveryreach/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteDeliveryreach = async (id) => {
    try {
        const response = await serverCall.delete(`/deliveryreach/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Deliveryreachservice = {
    getList, addDeliveryreach, getByid, updateDeliveryreach, deleteDeliveryreach
};

export default Deliveryreachservice;
