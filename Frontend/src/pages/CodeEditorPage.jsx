import React from 'react'
import { Outlet } from 'react-router-dom'
import EditorSidebar from '../components/Editor/EditorSidebar'

const CodeEditorPage = () => {
    return (
        <div className='flex justify-end w-screen min-h-[calc(100vh-3.5rem)]'>
            <div
                className={`h-screen hidden  md:block fixed top-[3.5rem] left-0 min-w-[300px]  border-r border-r-richblack-700 transition-all duration-300 z-20 pt-5 px-3`}
            >
                <EditorSidebar/>
            </div>
            <div
                className='h-[calc(100vh-4rem)] w-full md:w-[calc(100vw-320px)] text-white py-8 pr-4'
            >
                <Outlet/>
            </div>
        </div>
    )
}

export default CodeEditorPage
