import React from 'react'
import { features } from '../../data/features';



const FeatureSection = () => {
    return (
        <section id="features" className="bg-gray-900 text-white flex flex-col items-center justify-center  px-4 md:px-8 pt-20">
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
                {features.map((feature, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200">
                    <div className="text-3xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
} ; 


export default FeatureSection
