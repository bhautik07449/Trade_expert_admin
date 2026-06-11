import { useState } from "react";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { getImageUrl } from "../../../../utils/imageUtils";

export default function Image({ formik }) {
    const [tempImage, setTempImage] = useState("");

    const handleAddImage = () => {
        if (!tempImage) return;

        const updatedImages = [...(formik.values.images || []), tempImage];
        formik.setFieldValue("images", updatedImages);
        setTempImage("");
    };

    return (
        <div className="space-y-6">
            <div className="">
                <div className="flex items-end gap-4">
                    <ImageUploadField
                        label="Images"
                        onImageUpload={(url) => {
                            setTempImage(url);
                        }}
                    />

                    <button
                        type="button"
                        onClick={handleAddImage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Add
                    </button>
                </div>

                <div className="flex flex-wrap gap-4">
                    {formik.values.images?.map((img, index) => (
                        <div
                            key={index}
                            className="w-24 h-24 border rounded-lg overflow-hidden"
                        >
                            <img
                                src={getImageUrl(img)}
                                alt="uploaded"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <ImageUploadField
                    label="Certification"
                    value={formik.values.certification}
                    onImageUpload={(url) => {
                        formik.setFieldValue("certification", url);
                    }}
                />
            </div>
        </div>
    );
}