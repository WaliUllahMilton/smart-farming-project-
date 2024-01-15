import React from 'react';

const ImageUpload = ({ handleImageChange, selectedImage, handleSubmit }) => {
  return (
    <div>
      <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h2>Selected Image</h2>
          <img src={selectedImage} alt="Selected" />
          <button onClick={handleSubmit}>Submit Image</button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
