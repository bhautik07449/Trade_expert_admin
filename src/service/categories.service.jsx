import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/categories')
        return response
    } catch (error) {
        throw error
    }
}

const getFlat = async () => {
    try {
        const response = serverCall.get('/categories/flat')
        return response
    } catch (error) {
        throw error
    }
}

const create = async (payload) => {
    try {
        const response = serverCall.post('/categories', payload)
        return response
    } catch (error) {
        throw error
    }
}

const update = async (payload, id) => {
    try {
        const response = serverCall.put(`/categories/${id}`, payload)
        return response
    } catch (error) {
        throw error
    }
}

const deleteCat = async (id) => {
    try {
        const response = serverCall.delete(`/categories/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const Categoriesservice = {
    getList, create, update, deleteCat, getFlat
};

export default Categoriesservice;