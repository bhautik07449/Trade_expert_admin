import React, { useState } from 'react';

const ImageUploadField = ({ onImageUpload, label = 'Upload Image', accept = 'image/*' }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        if (onImageUpload) {
          onImageUpload(file);
        }
      };
      reader.readAsDataURL(file);
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
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" className="preview-image" />
        </div>
      )}
    </div>
  );
};

export default ImageUploadField;