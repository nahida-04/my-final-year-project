import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  /* ---------------- BUILD CART DATA ---------------- */
  useEffect(() => {

    if (products.length > 0) {

      const tempData = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId]
          });
        }
      }

      setCartData(tempData);
    }

  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item) => {

            const productData = products.find(
              (product) => product._id.toString() === item._id
            );

            if (!productData) return null;

            return (
              <div key={item._id} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] items-center gap-4'>

                {/* PRODUCT INFO */}
                <div className='flex items-start gap-6'>
                  <img
                    className='w-16 sm:w-20'
                    src={productData.image?.[0]}
                    alt={productData.name}
                  />

                  <div>
                    <p className='text-sm sm:text-lg font-medium'>
                      {productData.name}
                    </p>

                    <p className='mt-2'>
                      {currency}{productData.price}
                    </p>

                    {/* OPTIONAL: SHOW LANGUAGE & GENRE */}
                    <p className='text-xs text-gray-500 mt-1'>
                      {productData.language} | {productData.genre}
                    </p>
                  </div>
                </div>

                {/* QUANTITY */}
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 0) updateQuantity(item._id, val);
                  }}
                  className='border max-w-16 px-2 py-1'
                />

                {/* REMOVE */}
                <img
                  onClick={() => updateQuantity(item._id, 0)}
                  className='w-4 sm:w-5 cursor-pointer'
                  src={assets.bin_icon}
                  alt="remove"
                />

              </div>
            );
          })
        }
      </div>

      {/* TOTAL */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>

          <CartTotal />

          <div className='text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Cart;