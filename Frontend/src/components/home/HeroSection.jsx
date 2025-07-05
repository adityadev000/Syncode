import React, {  useState } from 'react';
import logo from '../../assets/Syncode_logo.png'
import CreateProjectForm from './CreateProjectForm';

const HeroSection = () => {
    const [btn , setBtn] = useState(false) ; 

    return (
        <section className="bg-gray-900 text-white  flex flex-col items-center justify-center ">
            <img src={logo}  className='h-40'/>
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
                Build Code Together. Live.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-8">
                Syncode is a real-time collaborative code editor that lets you and your team work on projects simultaneously, manage files and folders, and handle merge conflicts — all in the browser.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
            <button 
                onClick={() => setBtn(true) } 
                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md text-white font-medium">
                Create Project
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 transition px-6 py-3 rounded-md text-white font-medium">
                Join with Room ID
            </button>
            <label className="cursor-pointer inline-block">
                <input
                    type="file"
                    webkitdirectory="true"
                    multiple
                    className="hidden"
                />
                <div className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-md text-white font-medium">
                    Import Project
                </div>
            </label>
        </div>

        {
            btn && (<CreateProjectForm setBtn= {setBtn}/>)
        }
        </section>


    );
};



export default HeroSection;
