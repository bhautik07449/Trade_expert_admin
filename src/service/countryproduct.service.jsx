import serverCall from "../serverCall";

const getProductName = async (country) => {
    try {
        const response = serverCall.get('/countryproductname', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getProductNameByid = async (id) => {
    try {
        const response = serverCall.get(`/countryproductname/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addProductName = async (body) => {
    try {
        const response = await serverCall.post('/countryproductname', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateProductName = async (id, body) => {
    try {
        const response = await serverCall.patch(`/countryproductname/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteProductName = async (id) => {
    try {
        const response = await serverCall.delete(`/countryproductname/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}


const getProduct = async (country) => {
    try {
        const response = serverCall.get('/countryproduct', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getProductByid = async (id) => {
    try {
        const response = serverCall.get(`/countryproduct/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addProduct = async (body) => {
    try {
        const response = await serverCall.post('/countryproduct', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateProduct = async (id, body) => {
    try {
        const response = await serverCall.patch(`/countryproduct/${id}`, body);
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteProduct = async (id) => {
    try {
        const response = await serverCall.delete(`/countryproduct/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const CountryProductService = {
    getProductName, addProductName, getProductNameByid, updateProductName, deleteProductName,
    getProduct, addProduct, getProductByid, updateProduct, deleteProduct
};

export default CountryProductService;
