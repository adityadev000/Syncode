import React from 'react'
import HeroSection from '../components/home/HeroSection'
import FeatureSection from '../components/home/FeatureSection'
import HowItWorks from '../components/home/HowItWorks'
import Footer from '../components/home/Footer'

const Home = () => {
    return (
        <div className=' px-10 flex flex-col gap-28 pt-16'>
        {/* section 1  */}
            <HeroSection/>
            <FeatureSection/>
            <HowItWorks/>
            <Footer/>
        </div>
    )
}

export default Home
