import serverCall from "../serverCall";

const getQuotation = async (country) => {
    try {
        const response = serverCall.get('/quotation', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getRequestsample = async () => {
    try {
        const response = serverCall.get('/requestsamples')
        return response
    } catch (error) {
        throw error
    }
}

const getInquiry = async () => {
    try {
        const response = serverCall.get('/inquiry')
        return response
    } catch (error) {
        throw error
    }
}

const getContact = async () => {
    try {
        const response = serverCall.get('/contact')
        return response
    } catch (error) {
        throw error
    }
}

const deleteQuo = async (id) => {
    try {
        const response = serverCall.delete(`/quotation/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const Buyerinteractionservice = {
    getQuotation, getRequestsample, getInquiry, getContact, deleteQuo
};

export default Buyerinteractionservice;