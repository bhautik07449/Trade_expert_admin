import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/testimonial')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/testimonial/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addTestimonial = async (body) => {
    try {
        const response = await serverCall.post('/testimonial', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateTestimonial = async (id, body) => {
    try {
        const response = await serverCall.patch(`/testimonial/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteTestimonial = async (id) => {
    try {
        const response = await serverCall.delete(`/testimonial/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Testimonialservice = {
    getList, addTestimonial, getByid, updateTestimonial, deleteTestimonial
};

export default Testimonialservice;
