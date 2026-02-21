import ImageUploadField from "../../../../components/common/ImageUploadField";

export default function Image({ formik }) {
    return (
        <div className="grid grid-cols-2 gap-6">
            <div className="flex justify-between items-center">
                <ImageUploadField label="Applications" />
                <div>
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2"
                    >
                        Add
                    </button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <ImageUploadField label="Images" />
                <div>
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}