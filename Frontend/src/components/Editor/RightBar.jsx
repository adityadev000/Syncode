import React, { useEffect } from 'react'
import { GoDotFill } from 'react-icons/go'

const RightBar = ({project}) => {

    if(!project){
        return(<p>No Active members</p>)
    }
    return (
        <div className=' fixed top-[8rem]  w-[290px] h-[calc(100vh-7.5rem)] right-6  border border-richblack-200 rounded-md px-6 py-3 flex flex-col gap-4 bg-gray-800 transition-all duration-1000'>
            <div>
                <p>Total members : { project?.members?.length +1 } </p>
                <p>Total Active members : { project?.activeUsers?.length}</p>
            </div>

            <div className='overflow-y-auto flex flex-wrap justify-between'>

                {
                    <div className=' flex flex-col items-center'>
                        <div className='w-10 h-10 aspect-square rounded-full'>

                            <img src={project?.admin?.avtarUrl} className='aspect-square rounded-full'/>
                        </div>
                        <p>{project?.admin?.firstName}</p>
                        {
                            project?.activeUsers?.some(mem => mem?.user?._id === project?.admin?._id ) ? (<p className='flex items-center gap-1 text-green-400'>
                                <GoDotFill />
                                Active
                            </p> ): (
                                <p className='flex items-center gap-1 text-red-400'>
                                    <GoDotFill />
                                    Not-Active
                                </p>

                            )
                        }
                        {
                            <p>Admin</p>
                        }
                    </div>
                }
                {
                    project?.members?.map((member) => (
                        <div key={member} className=' flex flex-col items-center'>
                            <div className='w-10 h-10 aspect-square rounded-full'>

                                <img src={member?.user?.avtarUrl} className='aspect-square rounded-full'/>
                            </div>
                            <p>{member?.user?.firstName}</p>
                            {
                                project?.activeUsers?.some(mem => mem?.user?._id === member?.user?._id ) ? (<p className='flex items-center gap-1 text-green-400'>
                                    <GoDotFill />
                                    Active
                                </p> ): (
                                    <p className='flex items-center gap-1 text-red-400'>
                                        <GoDotFill />
                                        Not-Active
                                    </p>

                                )
                            }
                            <p className=' capitalize'>
                                {member?.permission === 'write' ? ('Read & Write') :('Read Only') }
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RightBar
