import serverCall from "../serverCall";

const getUser = async () => {
    try {
        const response = serverCall.get('/users/admins')
        return response
    } catch (error) {
        throw error
    }
}

const addAdmin = async (adminData) => {
    try {
        const response = await serverCall.post('/users', adminData);
        return response;
    } catch (error) {
        throw error;
    }
}

const Userservice = {
    getUser, addAdmin
};

export default Userservice;
