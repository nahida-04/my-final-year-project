import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from "react-toastify";

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  // FETCH PRODUCTS
  const fetchList = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        backendUrl + '/api/product/list',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // REMOVE PRODUCT
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success("Book Removed ✅")
        fetchList()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2 text-lg font-medium'>All Books List</p>

      {loading && (
        <p className='text-gray-500 mb-2'>Loading books...</p>
      )}

      <div className='flex flex-col gap-2'>

        {/* HEADER */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-semibold'>
          <b>Image</b>
          <b>Name</b>
          <b>Language</b>
          <b>Genre</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* LIST */}
        {list.length === 0 && !loading ? (
          <p className='text-gray-500'>No books found</p>
        ) : (
          list.map((item) => (
            <div
              key={item._id}
              className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border'
            >

              {/* IMAGE */}
              <img
                className='w-12 h-12 object-cover'
                src={item.image?.[0] || "https://via.placeholder.com/50"}
                alt=""
              />

              {/* NAME */}
              <p>{item.name}</p>

              {/* LANGUAGE */}
              <p>{item.language}</p>

              {/* GENRE */}
              <p>{item.genre}</p>

              {/* PRICE */}
              <p>{currency}{item.price}</p>

              {/* DELETE */}
              <p
                onClick={() => removeProduct(item._id)}
                className='text-red-500 text-center cursor-pointer text-lg'
              >
                X
              </p>

            </div>
          ))
        )}

      </div>
    </>
  )
}

export default List