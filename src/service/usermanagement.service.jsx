import serverCall from "../serverCall";

const getUser = async () => {
    try {
        const response = serverCall.get('/users/admins')
        return response
    } catch (error) {
        throw error
    }
}
const Userservice = {
    getUser
};

export default Userservice;
