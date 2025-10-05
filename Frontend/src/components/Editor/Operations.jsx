import React, { useState } from 'react'
import { FiFilePlus } from 'react-icons/fi'
import { MdDriveFileRenameOutline, MdOutlineCreateNewFolder, MdOutlineDelete } from 'react-icons/md'
import CreateModal from '../dashboard/CreateModal' ; 
import ConfirmationModal from '../common/ConfirmationModal';

const Operations = ({file , folder , deletee , path ,name ,  project , type}) => {

	const [modalData , setModalData] = useState(null) ; 
	const [confirmationModal , setConfirmationModal] = useState(null) ; 
	
	return (
		<div className='flex gap-1 items-center'>
			<MdDriveFileRenameOutline 
					onClick={() => {
						setModalData({
							text : `Renaming the ${type} name`,
							type :type ,  
							btn1Text : "Rename",
							defaultValue :name,
							opr : "rename" , 
							btn2Handler : () => {
								setModalData(null) ; 
							}
						})
					}}
			className=' text-lg'/>
			{
			file ? <FiFilePlus 
					onClick={() => {
						setModalData({
							text : "Creating a File",
							type : type,
							path : path ,  
							opr : "file" , 
							btn1Text : "Create a new file",
							btn2Handler : () => {
								setModalData(null) ; 
							}
						})
					}}
			/> : <div></div>
		}
		{
			folder ? <MdOutlineCreateNewFolder 
					onClick={() => {
						setModalData({
							text : "Creating a Folder",
							type : type,
							path : path ,
							opr : "folder" , 
							btn1Text : "Create a new folder",
							btn2Handler : () => {
								setModalData(null) ; 
							}
						})
					}}
					className=' text-lg'/> : <div></div>
		}
		{
			deletee ? <MdOutlineDelete 
				onClick={() => {
					setConfirmationModal({
						text1 : 'Are you sure ? ',
						text2 : `This ${type} will be deleted`, 
						btn1Text : "Delete",
						btn2Text : "Cancel",
						type : type ,
						btn2Handler : () => {
							setConfirmationModal(null) ; 
						}
					})
				}}
				className=' text-lg '
			/> : <div></div>
		}

		{
			modalData !== null  && (<CreateModal modalData={modalData} setModalData={setModalData}/> )
		}
		{
			confirmationModal !== null  && (<ConfirmationModal modalData={confirmationModal} setConfirmationModal = {setConfirmationModal}/> )
		}

		</div>
	)
}

export default Operations
