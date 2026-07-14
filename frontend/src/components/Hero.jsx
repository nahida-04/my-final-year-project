import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400 items-center bg-pink-100'>
        {/* hero left side */}
        <div className='w-full sm:w-3/5 flex items-center justify-center py-10 pl-6 sm:pl-10 lg:pl-16'>
            <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='font-medium text-sm md:text-base'>LATEST ARRIVALS</p>
                    </div>
                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>"Let your mind travel where your feet cannot."</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>

                    </div>

                </div>

            </div>

            {/* hero right side */}
            <div className='w-full sm:w-2/5 flex items-center justify-center'>
            <img 
                className='max-h-[350px] w-auto object-contain' 
                src={assets.book_hero} 
                alt="" 
            />
            </div>
        </div>
    )
}

export default Hero 

