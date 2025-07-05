import React, { useState } from 'react'
import { FiFilePlus } from 'react-icons/fi'
import { MdDriveFileRenameOutline, MdOutlineCreateNewFolder, MdOutlineDelete } from 'react-icons/md'
import CreateModal from '../dashboard/CreateModal' ; 
import { useParams } from 'react-router-dom';
import ConfirmationModal from '../common/ConfirmationModal';

const Operations = ({file , folder , deletee , path ,name ,  project , type}) => {
	const [modalData , setModalData] = useState(null) ; 
	const [confirmationModal , setConfirmationModal] = useState(null) ; 
	const {folderId , projectId , fileId } = useParams() ; 

	const btn1Handler = async() => {
		if(type === 'file' ){

		}
		else{

		}
	}
	return (
		<div className='flex gap-1 items-center'>
			<MdDriveFileRenameOutline 
					onClick={() => {
						setModalData({
							text : "Creating a File",
							type : "rename" , 
							btn1Text : "Rename",
							defaultValue :name,
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
							type : "File",
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
							type : "Folder",
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
						btn1Handler : btn1Handler , 
						btn2Handler : () => {
							setModalData(null) ; 
						}
					})
				}}
			/> : <div></div>
		}

		{
			modalData !== null  && (<CreateModal modalData={modalData} setModalData={setModalData}/> )
		}
		{
			confirmationModal !== null  && (<ConfirmationModal modalData={modalData} setModalData={setModalData}/> )
		}

		</div>
	)
}

export default Operations
