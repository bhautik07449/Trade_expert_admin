import serverCall from "../serverCall";

const getAdmin = async () => {
    try {
        const response = serverCall.get('/admin')
        return response
    } catch (error) {
        throw error
    }
}

const getAdminByid = async (id) => {
    try {
        const response = serverCall.get(`/admin/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addAdmin = async (adminData) => {
    try {
        const response = await serverCall.post('/admin', adminData);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateAdmin = async (id, adminData) => {
    try {
        const response = await serverCall.patch(`/admin/${id}`, adminData);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteAdmin = async (id) => {
    try {
        const response = serverCall.delete(`/admin/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const Adminservice = {
    getAdmin, addAdmin, getAdminByid, updateAdmin, deleteAdmin
};

export default Adminservice;
