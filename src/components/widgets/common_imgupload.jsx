import React from 'react'
import { Input } from '../ui/input'
import { Label } from "../../components/ui/label";
import { ImageUp } from 'lucide-react';

const CommonImgupload = ({ value, onChange, className }) => {

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            console.log("image", formData);
        }
    };

    return (
        <div className="">
            <Label
                htmlFor="profiles"
                className={className ?? "h-16 w-16 lg:h-20 lg:w-20 xxl:h-24 xxl:w-24 overflow-hidden border border-border rounded-md cursor-pointer flex items-center justify-center"}
            >
                {value ?
                    <img
                        src={value}
                        // alt="Profile"
                        className="w-full h-full object-cover bg-center"
                    />
                    :
                    <ImageUp className="md:size-[36px] opacity-50" />}
            </Label>
            <Input
                type="file"
                id="profiles"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
            />
        </div>
    )
}

export default CommonImgupload
