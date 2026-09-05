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

const updateBuyerStatus = async (id, status) => {
    try {
        const response = await serverCall.patch(`/buyers/admin/${id}/status`, { status });
        return response;
    } catch (error) {
        throw error;
    }
};

const updateBuyer = async (id, body) => {
    try {
        const response = await serverCall.patch(`/buyers/admin/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
};

const Buyerservice = {
    getList, deleteBuyer, updateBuyerStatus, updateBuyer
};

export default Buyerservice;
