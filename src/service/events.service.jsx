import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/events')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/events/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addEvents = async (body) => {
    try {
        const response = await serverCall.post('/events', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateEvents = async (id, body) => {
    try {
        const response = await serverCall.patch(`/events/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteEvents = async (id) => {
    try {
        const response = await serverCall.delete(`/events/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Eventsservice = {
    getList, addEvents, getByid, updateEvents, deleteEvents
};

export default Eventsservice;
