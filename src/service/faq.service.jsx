import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/faq')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/faq/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addFaq = async (body) => {
    try {
        const response = await serverCall.post('/faq', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateFaq = async (id, body) => {
    try {
        const response = await serverCall.patch(`/faq/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteFaq = async (id) => {
    try {
        const response = await serverCall.delete(`/faq/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Faqservice = {
    getList, addFaq, getByid, updateFaq, deleteFaq
};

export default Faqservice;
