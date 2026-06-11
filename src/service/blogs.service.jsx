import serverCall from "../serverCall";

const getBlogList = async (country) => {
    try {
        const response = serverCall.get('/blogcategory', { params: country ? { country: country } : {} })
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

const getList = async (country) => {
    try {
        const response = serverCall.get('/blogs', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getById = async (id) => {
    try {
        const response = serverCall.get(`/blogs/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addblog = async (body) => {
    try {
        const response = await serverCall.post('/blogs', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateblog = async (id, body) => {
    try {
        const response = await serverCall.patch(`/blogs/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteblog = async (id) => {
    try {
        const response = await serverCall.delete(`/blogs/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Blogservice = {
    getBlogList, addBlog, getBlogByid, updateBlog, deleteBlog, getList, addblog, getById, updateblog, deleteblog
};

export default Blogservice;
