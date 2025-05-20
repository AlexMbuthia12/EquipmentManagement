import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddItem = () => {
  const [formData, setFormData] = useState({ type: '', name: '' });
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dropRef = useRef();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add('border-blue-500');
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove('border-blue-500');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.type || !formData.name || !imageFile) {
      toast.error('All fields are required');
      return;
    }

    const data = new FormData();
    data.append('type', formData.type);
    data.append('name', formData.name);
    data.append('image', imageFile);

    setLoading(true);
    try {
      await axios.post('http://localhost:7000/api/items', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Item added successfully!');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Item Type"
            className="w-full border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="w-full border rounded px-4 py-2"
            required
          />

          {/* 🔽 Drag & Drop Zone */}
          <div
            ref={dropRef}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className="w-full border-2 border-dashed border-gray-300 rounded px-4 py-6 text-center cursor-pointer"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="cursor-pointer text-sm text-gray-600">
              {previewURL ? 'Change Image' : 'Click or Drag Image Here'}
            </label>
            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                className="mt-4 mx-auto h-32 object-contain rounded"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            {loading ? 'Saving...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
