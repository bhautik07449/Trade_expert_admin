import serverCall from "../serverCall";

const getProductList = async () => {
    try {
        const response = serverCall.get('/products')
        return response
    } catch (error) {
        throw error
    }
}

const addProduct = async (payload) => {
    try {
        const response = await serverCall.post('/products', payload);
        return response;
    } catch (error) {
        throw error;
    }
}

const getById = async (id) => {
    try {
        const response = await serverCall.get(`/products/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateProduct = async (id, body) => {
    try {
        const response = await serverCall.patch(`/products/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await serverCall.delete(`/products/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const Productservice = {
    getProductList, addProduct, getById, updateProduct, deleteProduct
};

export default Productservice;
