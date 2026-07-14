import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  // FETCH ALL ORDERS
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      setLoading(true)

      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setOrders(response.data.order)
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

  // UPDATE ORDER STATUS
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          status: event.target.value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success("Status Updated ✅")
        fetchAllOrders()
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3 className='text-lg font-semibold mb-3'>Orders Page</h3>

      {loading && (
        <p className="text-gray-500 mb-2">Loading orders...</p>
      )}

      <div>

        {orders.length === 0 && !loading ? (
          <p className="text-gray-500">No orders found</p>
        ) : (

          orders.map((item) => (
            <div
              key={item._id}
              className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 text-sm text-gray-700'
            >

              {/* ICON */}
              <img className='w-12' src={assets.parcel_icon} alt="order" />

              {/* ORDER DETAILS */}
              <div>

                {/* ITEMS */}
                <div>
                  {item.items?.map((product, i) => (
                    <p className='py-0.5' key={i}>
                      {product.name} x {product.quantity}
                      <span className='text-gray-400'>
                        {" "}({product.language} / {product.genre})
                      </span>
                      {i !== item.items.length - 1 && ","}
                    </p>
                  ))}
                </div>

                {/* ADDRESS */}
                <p className='mt-3 mb-2 font-medium'>
                  {item.address?.firstName} {item.address?.lastName}
                </p>

                <div>
                  <p>{item.address?.street},</p>
                  <p>
                    {item.address?.city}, {item.address?.state}, {item.address?.country}, {item.address?.zipcode}
                  </p>
                </div>

                <p>{item.address?.phone}</p>
              </div>

              {/* ORDER INFO */}
              <div>
                <p>Items: {item.items?.length || 0}</p>
                <p className='mt-2'>Method: {item.paymentMethod}</p>
                <p>Payment: {item.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</p>
              </div>

              {/* AMOUNT */}
              <p>{currency}{item.amount}</p>

              {/* STATUS */}
              <select
                onChange={(event) => statusHandler(event, item._id)}
                value={item.status}
                className='p-2 font-semibold border'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          ))

        )}

      </div>
    </div>
  )
}

export default Orders