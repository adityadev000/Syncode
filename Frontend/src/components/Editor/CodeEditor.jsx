import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react';
import { getFileContent, saveFileData } from '../../services/operarions/projectApis';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const CodeEditor = () => {
    const {fileId} = useParams() ; 
    const {token} = useSelector((state) => state.auth) ; 
    const [file , setFile] = useState(null) ; 
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const[saveLoading , setSaveLoading] = useState(false) ; 

    const handleEditorChange = (value) => {
        setCode(value);
        // Optional: You can debounce and update this to backend later
    };

    const fetchFile = async () => {
        setLoading(true) ; 
        const result = await getFileContent(fileId , token) ; 
        if(result){
            setFile(result) ; 
            // if(result?.content !== '' ) 
            setCode(result.content) ; 
        }
        setLoading(false) ; 
    };

    const saveHandler = async()=> {
        setSaveLoading(true) ; 
        if(code === file.content){
            toast.error("please make changes to save file") ;
            setSaveLoading(false) ; 
            return  ;  
        }
        const result = await saveFileData(fileId , code , token) ; 

        if(result ){
            fetchFile() ; 
        }

        setSaveLoading(false) ; 

    }



    useEffect(() => {

        console.log(fileId) ; 
        if (fileId){
            fetchFile();
        } 
        else{
            setFile(null) ; 
            setCode("") ;
        }
    }, [fileId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!file) {
        return <div>No files Selected Please select a file to open</div>;
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            <div className=' flex justify-between items-center pr-5 pb-4'>

                <h2 className="text-xl font-bold mb-2">Editing File: {file.name}</h2>

                <button className=' border border-richblack-600 rounded-md px-3 py-2' 
                    onClick={saveHandler}
                    disabled={saveLoading}
                >{saveLoading ? "Saving.." : "Save"}</button>
            </div>


            <div className="border border-gray-800 rounded-md overflow-hidden h-[80vh]">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                        fontSize: 18, 
                        minimap: { enabled: false },
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
    
    
}

export default CodeEditor
