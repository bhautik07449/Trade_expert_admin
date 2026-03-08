import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/contact')
        return response
    } catch (error) {
        throw error
    }
}

const deleteContact = async (id) => {
    try {
        const response = await serverCall.delete(`/contact/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Contactservice = {
    getList, deleteContact
};

export default Contactservice;
