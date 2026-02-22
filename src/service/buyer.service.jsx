import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/buyers/admin')
        return response
    } catch (error) {
        throw error
    }
}

const deleteBuyer = async (id) => {
    try {
        const response = serverCall.delete(`/buyers/admin/${id}`)
        return response
    } catch (error) {
        throw error
    }

}

const Buyerservice = {
    getList, deleteBuyer
};

export default Buyerservice;
