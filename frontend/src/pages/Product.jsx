import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  const fetchProductData = () => {
    const found = products?.find((item) => item._id === productId);

    if (found) {
      setProductData(found);
      setImage(found.image?.[0] || '');
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* PRODUCT SECTION */}
      <div className='flex gap-12 flex-col sm:flex-row'>

        {/* IMAGES */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          {/* THUMBNAILS */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18%] w-full'>
            {
              (productData.image || []).map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  src={item}
                  className='w-[24%] sm:w-full sm:mb-3 cursor-pointer'
                  alt=""
                />
              ))
            }
          </div>

          {/* MAIN IMAGE */}
          <div className='w-full sm:w-[80%]'>
            <img
              src={image || assets.placeholder}
              className='w-full h-auto'
              alt=""
            />
          </div>

        </div>

        {/* INFO */}
        <div className='flex-1'>

          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
          </h1>

          {/* RATING */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_dull_icon} className="w-3" />
            <p className='ml-2'>(122)</p>
          </div>

          {/* PRICE */}
          <p className='mt-5 text-3xl font-medium'>
            {currency}{productData.price}
          </p>

          {/* DESCRIPTION */}
          <p className='mt-5 text-gray-500'>
            {productData.description}
          </p>

          {/* BOOK INFO */}
          <div className='mt-6 text-sm text-gray-600'>
            <p><b>Language:</b> {productData.language}</p>
            <p><b>Genre:</b> {productData.genre}</p>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => addToCart(productData._id)}
            className='bg-black text-white py-4 px-6 mt-6'
          >
            ADD TO CART
          </button>

          <hr className='mt-8' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Books.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return within 7 days.</p>
          </div>

        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className='mt-20'>

        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews</p>
        </div>

        <div className='border px-6 py-6 text-sm text-gray-500'>
          <p>Book details and summary will appear here.</p>
        </div>

      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProducts
        genre={productData.genre}
        language={productData.language}
      />

    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;