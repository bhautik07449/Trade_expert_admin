import serverCall from "../serverCall";

const getList = async (country, category) => {
    try {
        const response = serverCall.get('/ir_project', { params: country || category ? { country: country, category: category } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/ir_project/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addIRProject = async (body) => {
    try {
        const response = await serverCall.post('/ir_project', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateIRProject = async (id, body) => {
    try {
        const response = await serverCall.patch(`/ir_project/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteIRProject = async (id) => {
    try {
        const response = await serverCall.delete(`/ir_project/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const IRProjectservice = {
    getList, addIRProject, getByid, updateIRProject, deleteIRProject
};

export default IRProjectservice;
