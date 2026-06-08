import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/suppliers', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getById = async (id) => {
    try {
        const response = serverCall.get(`/suppliers/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addSuppliers = async (body) => {
    try {
        const response = serverCall.post('/suppliers', body)
        return response
    } catch (error) {
        throw error
    }
}

const updateSuppliers = async (body, id) => {
    try {
        const response = serverCall.patch(`/suppliers/${id}`, body)
        return response
    } catch (error) {
        throw error
    }
}

const deleteSupplier = async (id) => {
    try {
        const response = serverCall.delete(`/suppliers/${id}`)
        return response
    } catch (error) {
        throw error
    }

}

const Supplierservice = {
    getList, addSuppliers, deleteSupplier, getById, updateSuppliers
};

export default Supplierservice;