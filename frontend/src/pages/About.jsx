import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-10 px-4'>
        <img className='w-full md:w-[45%] h-full max-h-[420px] object-cover rounded-lg shadow-md' src={assets.about} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-[55%] text-gray-600'>
          <p>Forever was born out of a passion for books and a vision to transform the way people discover and enjoy reading. Our journey began with a simple idea: to create a platform where readers can easily explore, discover, and purchase books from the comfort of their homes.</p>
          <p>Since our inception, we have worked tirelessly to curate a diverse collection of books across genres—ranging from fiction and non-fiction to academic, self-development, and beyond. What sets us apart is our intelligent recommendation system, designed to help readers find books that truly match their interests and reading preferences.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to make reading more accessible, personalized, and enjoyable for everyone. We aim to connect readers with the right books at the right time through a seamless platform and intelligent recommendations, fostering a lifelong love for learning and storytelling.</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p>Curated Book Collection:</p>
          <p className='text-gray-600'>We carefully select books across genres to ensure readers get access to high-quality and meaningful content.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p>Personalized Recommendations:</p>
          <p className='text-gray-600'>Our smart recommendation system helps you discover books tailored to your interests and reading habits.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <p>Seamless Reading Experience:</p>
          <p className='text-gray-600'>From browsing to discovering your next favorite book, we provide a smooth and enjoyable user experience.</p>
        </div>
      </div>
      
      <NewsletterBox/>

    </div>
  )
}

export default About
