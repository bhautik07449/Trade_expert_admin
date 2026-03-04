import serverCall from "../serverCall";

const getBlogList = async () => {
    try {
        const response = serverCall.get('/blogcategory')
        return response
    } catch (error) {
        throw error
    }
}

const getBlogByid = async (id) => {
    try {
        const response = serverCall.get(`/blogcategory/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addBlog = async (body) => {
    try {
        const response = await serverCall.post('/blogcategory', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateBlog = async (id, body) => {
    try {
        const response = await serverCall.patch(`/blogcategory/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteBlog = async (id) => {
    try {
        const response = await serverCall.delete(`/blogcategory/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Blogservice = {
    getBlogList, addBlog, getBlogByid, updateBlog, deleteBlog
};

export default Blogservice;
