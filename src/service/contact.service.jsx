import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/contact', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const deleteContact = async (id) => {
    try {
        const response = await serverCall.delete(`/contact/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const getContactList = async (country) => {
    try {
        const response = serverCall.get('/contactno', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/contactno/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addContact = async (body) => {
    try {
        const response = await serverCall.post('/contactno', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateContact = async (id, body) => {
    try {
        const response = await serverCall.patch(`/contactno/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteContactNo = async (id) => {
    try {
        const response = await serverCall.delete(`/contactno/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Contactservice = {
    getList, deleteContact,
    getContactList, addContact, updateContact, deleteContactNo, getByid
};

export default Contactservice;
