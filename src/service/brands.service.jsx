import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/brands')
        return response
    } catch (error) {
        throw error
    }
}

const getById = async (id) => {
    try {
        const response = serverCall.get(`/brands/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const create = async (payload) => {
    try {
        const response = serverCall.post('/brands', payload)
        return response
    } catch (error) {
        throw error
    }
}

const update = async (payload, id) => {
    try {
        const response = serverCall.patch(`/brands/${id}`, payload)
        return response
    } catch (error) {
        throw error
    }
}

const deleteBrand = async (id) => {
    try {
        const response = serverCall.delete(`/brands/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const Brandservice = {
    getList, create, update, deleteBrand, getById
};

export default Brandservice;