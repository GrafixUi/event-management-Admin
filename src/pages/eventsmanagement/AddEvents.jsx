import React,{useState} from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Createcampaign() {

    const [formData, setFormData] = useState({
        name: '',
        uploadimg: null, 
        brandname: '',
        description: '',
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === 'uploadimg' ? files[0] : value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('uploadimg', formData.uploadimg);
        formDataToSend.append('brandname', formData.brandname);
        formDataToSend.append('description', formData.description);
    
        try {
          const response = await fetch('http://localhost:5000/api/campaign/upload-image', {
            method: 'POST',
            body: formDataToSend,
          });
    
          if (response.ok) {
            console.log('Image uploaded successfully');
            toast.success('Campaign created successfully!', { position: toast.POSITION.TOP_RIGHT });
            window.location.reload()
          } else {
            console.error('Failed to upload image');
            toast.error('Failed to create campaign. Please try again.', { position: toast.POSITION.TOP_RIGHT });
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error('Error creating campaign. Please try again later.', { position: toast.POSITION.TOP_RIGHT });
        }
      };

    return (
        <div>
            <div className="container mx-auto max-w-md mt-4">
                <h1 className="text-center text-2xl font-semibold mb-4">Create New Event</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text" onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Upload AD Image</label>
                        <div className="relative">
                            <input
                                type="file" onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="uploadimg"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Brand / Company Name</label>
                        <div className="relative">
                            
                            <input 
                                type="text" onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="brandname"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            type="text" onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            name="description"
                            rows={4}
                        />
                    </div>
                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                        >
                            Create Events
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
