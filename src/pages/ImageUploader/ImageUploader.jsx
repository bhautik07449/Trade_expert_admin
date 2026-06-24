import React, { useState } from "react";
import ImageUploadField from "../../components/common/ImageUploadField";
import CommonButton from "../../components/widgets/common_button";
import { Copy } from "lucide-react";
import { getImageUrl } from "../../utils/imageUtils";

export default function ImageUploader() {
    const [uploadedUrl, setUploadedUrl] = useState(null);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-100 p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Image Uploader</h1>
                    <p className="text-sm text-slate-500 mt-1">Upload a photo to get its URL.</p>
                </div>

                <div className="mb-6">
                    <ImageUploadField
                        label=""
                        onImageUpload={(url) => setUploadedUrl(url)}
                    />
                </div>

                {uploadedUrl && (
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <p className="text-sm font-medium text-slate-700">Uploaded URL:</p>
                        <div className="p-3 bg-slate-50 rounded-md text-sm text-slate-600 break-all border border-slate-200">
                            {getImageUrl(uploadedUrl)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
