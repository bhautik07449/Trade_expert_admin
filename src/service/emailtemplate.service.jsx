import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/emailtemplate')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/emailtemplate/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addEmailtemplate = async (body) => {
    try {
        const response = await serverCall.post('/emailtemplate', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateEmailtemplate = async (id, body) => {
    try {
        const response = await serverCall.patch(`/emailtemplate/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteEmailtemplate = async (id) => {
    try {
        const response = await serverCall.delete(`/emailtemplate/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Emailtemplateservice = {
    getList, addEmailtemplate, getByid, updateEmailtemplate, deleteEmailtemplate
};

export default Emailtemplateservice;
