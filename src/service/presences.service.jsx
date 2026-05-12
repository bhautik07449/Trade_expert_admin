import axios from "axios";
import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/presences')
        return response
    } catch (error) {
        throw error
    }
}

const getCountry = async () => {
    try {
        const response = await axios.get('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/presences/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addPresences = async (body) => {
    try {
        const response = await serverCall.post('/presences', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updatePresences = async (id, body) => {
    try {
        const response = await serverCall.patch(`/presences/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deletePresences = async (id) => {
    try {
        const response = await serverCall.delete(`/presences/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const PresencesService = {
    getList, addPresences, getByid, updatePresences, deletePresences, getCountry
};

export default PresencesService;
