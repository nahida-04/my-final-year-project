import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductCard from '../components/ProductCard';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [language, setLanguage] = useState([]);
  const [genre, setGenre] = useState([]);

  const [sortType, setSortType] = useState('relevant');

  /* ---------------- TOGGLE LANGUAGE ---------------- */
  const toggleLanguage = (e) => {
    if (language.includes(e.target.value)) {
      setLanguage(prev => prev.filter(item => item !== e.target.value));
    } else {
      setLanguage(prev => [...prev, e.target.value]);
    }
  };

  /* ---------------- TOGGLE GENRE ---------------- */
  const toggleGenre = (e) => {
    if (genre.includes(e.target.value)) {
      setGenre(prev => prev.filter(item => item !== e.target.value));
    } else {
      setGenre(prev => [...prev, e.target.value]);
    }
  };

  /* ---------------- APPLY FILTER ---------------- */
  const applyFilter = () => {
    let productsCopy = products.slice();

    // SEARCH FILTER
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // LANGUAGE FILTER
    if (language.length > 0) {
      productsCopy = productsCopy.filter(item =>
        language.includes(item.language)
      );
    }

    // GENRE FILTER
    if (genre.length > 0) {
      productsCopy = productsCopy.filter(item =>
        genre.includes(item.genre)
      );
    }

    setFilterProducts(productsCopy);
  };

  /* ---------------- SORT ---------------- */
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [language, genre, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* FILTERS */}
      <div className='w-full sm:w-[250px]'>

        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} />
        </p>

        {/* LANGUAGE FILTER */}
        <div className={`border pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>LANGUAGE</p>

          <div className='flex flex-col gap-2 text-sm'>
            <label><input type="checkbox" value="English" onChange={toggleLanguage} /> English</label>
            <label><input type="checkbox" value="Hindi" onChange={toggleLanguage} /> Hindi</label>
            <label><input type="checkbox" value="Bengali" onChange={toggleLanguage} /> Bengali</label>
          </div>
        </div>

        {/* GENRE FILTER */}
        <div className={`border pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>GENRE</p>

          <div className='flex flex-col gap-2 text-sm'>
            <label><input type="checkbox" value="Fiction" onChange={toggleGenre} /> Fiction</label>
            <label><input type="checkbox" value="Biography" onChange={toggleGenre} /> Biography</label>
            <label><input type="checkbox" value="Horror" onChange={toggleGenre} /> Horror</label>
          </div>
        </div>

      </div>

      {/* PRODUCTS */}
      <div className='flex-1'>

        <div className='flex justify-between mb-4'>
          <Title text1={'ALL'} text2={'BOOKS'} />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border px-2 text-sm'
          >
            <option value="relevant">Sort: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* GRID */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
            filterProducts.map((item, index) => (
              <ProductCard
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default Collection;