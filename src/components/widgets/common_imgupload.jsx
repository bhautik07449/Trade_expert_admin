import React from 'react'
import { Input } from '../ui/input'
import { Label } from "../../components/ui/label";
import { ImageUp } from 'lucide-react';

const CommonImgupload = ({ value, onChange, onBlur, className }) => {

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange(file);
        }
    };

    const previewUrl = value instanceof File ? URL.createObjectURL(value) : value;

    return (
        <div>
            <Label
                htmlFor="profiles"
                className={className ?? "h-16 w-16 lg:h-20 lg:w-20 xxl:h-24 xxl:w-24 overflow-hidden border border-border rounded-md cursor-pointer flex items-center justify-center"}
            >
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        className="w-full h-full object-cover bg-center"
                    />
                ) : (
                    <ImageUp className="md:size-[36px] opacity-50" />
                )}
            </Label>

            <Input
                type="file"
                id="profiles"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                onBlur={onBlur}
            />
        </div>
    );
};

export default CommonImgupload;