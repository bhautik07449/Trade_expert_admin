import serverCall from "../serverCall";

const imageUpload = async (body) => {
    try {
        const response = serverCall.post('/upload', body)
        return response
    } catch (error) {
        throw error
    }
}

const ImageUploadService = {
    imageUpload
};

export default ImageUploadService;