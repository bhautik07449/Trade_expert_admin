import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/inquiry')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/inquiry/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addInquiry = async (body) => {
    try {
        const response = await serverCall.post('/inquiry', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateInquiry = async (id, body) => {
    try {
        const response = await serverCall.patch(`/inquiry/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteInquiry = async (id) => {
    try {
        const response = await serverCall.delete(`/inquiry/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Inquiryservice = {
    getList, addInquiry, getByid, updateInquiry, deleteInquiry
};

export default Inquiryservice;
