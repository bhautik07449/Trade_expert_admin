import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/certificationslider')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/certificationslider/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addCertificationslider = async (body) => {
    try {
        const response = await serverCall.post('/certificationslider', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateCertificationslider = async (id, body) => {
    try {
        const response = await serverCall.patch(`/certificationslider/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteCertificationslider = async (id) => {
    try {
        const response = await serverCall.delete(`/certificationslider/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Certificationsliderservice = {
    getList, addCertificationslider, getByid, updateCertificationslider, deleteCertificationslider
};

export default Certificationsliderservice;
