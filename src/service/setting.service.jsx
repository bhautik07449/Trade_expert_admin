
import serverCall from "../serverCall";

const getGeneral = async () => {
    try {
        const response = serverCall.get('/general_settings')
        return response
    } catch (error) {
        throw error
    }
}

const updateGeneral = async (body) => {
    try {
        const response = await serverCall.patch('/general_settings', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const getSocial = async () => {
    try {
        const response = serverCall.get('/social_settings')
        return response
    } catch (error) {
        throw error
    }
}

const updateSocial = async (body) => {
    try {
        const response = await serverCall.patch('/social_settings', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const Settingservice = {
    getGeneral, updateGeneral, getSocial, updateSocial
};

export default Settingservice;