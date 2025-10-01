import React, { useState } from 'react'
import InviteForm from './InviteForm';

const TopBar = () => {

    const [btn , setBtn] = useState(false) ; 

    const inviteHandler = ()=>{
        setBtn(true) ; 
    }
    return (
        <div>
            <button onClick={inviteHandler} className=' border px-3 py-2 bg-yellow-300 text-richblack-900 rounded-lg'>Invite +</button>

            {
                btn && (<InviteForm setBtn= {setBtn} />)
            }
            
        </div>
    )
}

export default TopBar
