import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/gallery')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/gallery/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addGallery = async (body) => {
    try {
        const response = await serverCall.post('/gallery', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateGallery = async (id, body) => {
    try {
        const response = await serverCall.patch(`/gallery/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteGallery = async (id) => {
    try {
        const response = await serverCall.delete(`/gallery/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Galleryservice = {
    getList, addGallery, getByid, updateGallery, deleteGallery
};

export default Galleryservice;
