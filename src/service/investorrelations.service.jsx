import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/investorrelations')
        return response
    } catch (error) {
        throw error
    }
}

const getByid = async (id) => {
    try {
        const response = serverCall.get(`/investorrelations/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addInvestorrelations = async (body) => {
    try {
        const response = await serverCall.post('/investorrelations', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateInvestorrelations = async (id, body) => {
    try {
        const response = await serverCall.patch(`/investorrelations/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteInvestorrelations = async (id) => {
    try {
        const response = await serverCall.delete(`/investorrelations/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const InvestorrelationsService = {
    getList, addInvestorrelations, getByid, updateInvestorrelations, deleteInvestorrelations
};

export default InvestorrelationsService;
