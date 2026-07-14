import React, { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { assets } from '../assets/assets';
import { backendUrl } from '../App';

const Add = ({ token }) => {

  // IMAGES (SAFE ARRAY METHOD)
  const [images, setImages] = useState([false, false, false, false]);

  // BOOK DATA
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [language, setLanguage] = useState("English");
  const [genre, setGenre] = useState("Fiction");
  const [bestseller, setBestseller] = useState(false);

  // HANDLE IMAGE CHANGE
  const handleImageChange = (index, file) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  // SUBMIT HANDLER
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("language", language);
      formData.append("genre", genre);
      formData.append("bestseller", bestseller.toString());

      // IMPORTANT: MUST MATCH backend "images"
      images.forEach((img) => {
        if (img) {
          formData.append("images", img);
        }
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success("Book Added Successfully ✅");

        // RESET FORM
        setName("");
        setDescription("");
        setPrice("");
        setLanguage("English");
        setGenre("Fiction");
        setImages([false, false, false, false]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col w-full items-start gap-3'
    >

      {/* IMAGE UPLOAD */}
      <div>
        <p className='mb-2'>Upload Book Images</p>

        <div className='flex gap-2'>
          {images.map((img, index) => (
            <label key={index} htmlFor={`image${index}`}>

              <img
                className='w-20 h-20 object-cover border'
                src={
                  !img
                    ? assets.upload_area
                    : URL.createObjectURL(img)
                }
                alt=""
              />

              <input
                type="file"
                id={`image${index}`}
                hidden
                onChange={(e) =>
                  handleImageChange(index, e.target.files[0])
                }
              />

            </label>
          ))}
        </div>
      </div>

      {/* NAME */}
      <div className='w-full'>
        <p className='mb-2'>Book Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          type="text"
          placeholder='Atomic Habits'
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className='w-full'>
        <p className='mb-2'>Book Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write description here'
          required
        />
      </div>

      {/* LANGUAGE + GENRE + PRICE */}
      <div className='flex flex-col sm:flex-row gap-4 w-full'>

        {/* LANGUAGE */}
        <div>
          <p className='mb-2'>Language</p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className='px-3 py-2'
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Bengali</option>
          </select>
        </div>

        {/* GENRE */}
        <div>
          <p className='mb-2'>Genre</p>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className='px-3 py-2'
          >
            <option>Fiction</option>
            <option>Biography</option>
            <option>Horror</option>
            <option>Self Help</option>
          </select>
        </div>

        {/* PRICE */}
        <div>
          <p className='mb-2'>Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='px-3 py-2 w-[120px]'
            type="number"
            placeholder='299'
            required
          />
        </div>

      </div>

      {/* BESTSELLER */}
      <div className='flex items-center gap-2 mt-2'>
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)}
        />
        <label>Add to Bestseller</label>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className='w-32 py-3 mt-4 bg-black text-white'
      >
        ADD BOOK
      </button>

    </form>
  );
};

export default Add;