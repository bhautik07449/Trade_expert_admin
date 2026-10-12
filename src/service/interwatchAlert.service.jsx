import serverCall from "../serverCall";

const getInterwatchAlerts = async (params) => {
    try {
        const response = await serverCall.get('/interwatch-alert', { params });
        return response;
    } catch (error) {
        throw error;
    }
};

const getInterwatchAlertById = async (id) => {
    try {
        const response = await serverCall.get(`/interwatch-alert/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const addInterwatchAlert = async (data) => {
    try {
        const response = await serverCall.post('/interwatch-alert', data);
        return response;
    } catch (error) {
        throw error;
    }
};

const updateInterwatchAlert = async (id, data) => {
    try {
        const response = await serverCall.patch(`/interwatch-alert/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteInterwatchAlert = async (id) => {
    try {
        const response = await serverCall.delete(`/interwatch-alert/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const getInterwatchAlertStats = async () => {
    try {
        const response = await serverCall.get('/interwatch-alert/stats');
        return response;
    } catch (error) {
        throw error;
    }
};

const InterwatchAlertService = {
    getInterwatchAlerts,
    getInterwatchAlertById,
    addInterwatchAlert,
    updateInterwatchAlert,
    deleteInterwatchAlert,
    getInterwatchAlertStats,
};

export default InterwatchAlertService;
