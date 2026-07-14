import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const currency = '$';
    const delivery_fee = 10;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    /* ---------------- ADD TO CART ---------------- */
    const addToCart = async (itemId) => {

        let cartData = { ...cartItems };

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/add',
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    /* ---------------- CART COUNT ---------------- */
    const getCartCount = () => {
        let totalCount = 0;

        for (const item in cartItems) {
            totalCount += cartItems[item];
        }

        return totalCount;
    };

    /* ---------------- UPDATE QUANTITY ---------------- */
    const updateQuantity = async (itemId, quantity) => {

        let cartData = { ...cartItems };
        cartData[itemId] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendUrl + '/api/cart/update',
                    { itemId, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    /* ---------------- GET USER CART ---------------- */
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    /* ---------------- CART TOTAL ---------------- */
    const getCartAmount = () => {
        let totalAmount = 0;

        for (const itemId in cartItems) {
            const itemInfo = products.find(p => p._id === itemId);

            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }

        return totalAmount;
    };

    /* ---------------- FETCH PRODUCTS ---------------- */
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);

            const data = response.data;

            if (data.success && Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                setProducts([]);
                toast.error("Invalid product data");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    /* ---------------- INIT ---------------- */
    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (!token && storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, []);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;