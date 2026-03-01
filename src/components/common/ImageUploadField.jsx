import React, { useState } from 'react';
import ImageUploadService from '../../service/imageupload.service';

const ImageUploadField = ({ onImageUpload, label = 'Upload Image', accept = 'image/*'}) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);

        const response = await ImageUploadService.imageUpload(formData);

        const imageUrl = response?.data?.url;

        if (imageUrl) {
          setPreview(imageUrl);

          if (onImageUpload) {
            
            onImageUpload(imageUrl);
          }
        }

      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="image-upload-field flex flex-col gap-2">
      {label && <label className="upload-label">{label}</label>}

      <input
        type="file"
        accept={accept}
        onChange={handleImageChange}
        className="file-input"
      />

      {loading && <p>Uploading...</p>}

      {preview && (
        <div className="image-preview">
          <img
            src={preview}
            alt="Preview"
            className="preview-image h-36 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;