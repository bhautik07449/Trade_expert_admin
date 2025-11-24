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

const Productservice = {
    getProductList, addProduct
};

export default Productservice;
