import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductCard';
import Title from './Title';

const RelatedProducts = ({ genre, language }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {

        if (!products || products.length === 0) return;

        const filtered = products.filter((item) => {

            const matchGenre = genre ? item.genre === genre : true;
            const matchLanguage = language ? item.language === language : true;

            return matchGenre && matchLanguage;
        });

        setRelated(filtered.slice(0, 5));

    }, [products, genre, language]);

    return (
        <div className='my-24'>

            {/* Title */}
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'BOOKS'} />
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

                {
                    related.length > 0 ? (
                        related.map((item) => (
                            <ProductItem
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                            />
                        ))
                    ) : (
                        <p className='text-gray-500 col-span-full text-center'>
                            No related books found
                        </p>
                    )
                }

            </div>

        </div>
    );
};

export default RelatedProducts;