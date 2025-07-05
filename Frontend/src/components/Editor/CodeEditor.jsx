import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '@monaco-editor/react';
import { getFileContent } from '../../services/operarions/projectApis';
import { useSelector } from 'react-redux';
const CodeEditor = () => {
    const {projectId , fileId} = useParams() ; 
    const {token} = useSelector((state) => state.auth) ; 
    const [file , setFile] = useState(null) ; 
    const [code, setCode] = useState('//write your own code here');
    const [loading, setLoading] = useState(true);

    const handleEditorChange = (value) => {
        setCode(value);
        // Optional: You can debounce and update this to backend later
    };

    useEffect(() => {
        const fetchFile = async () => {
            setLoading(true) ; 
            const result = await getFileContent(fileId , token) ; 
            if(result){
                setFile(result) ; 
                if(file?.content !== '' ) 
                    setCode(file?.content) ; 
            }
        };

        if (fileId) fetchFile();
    }, [fileId]);

    if(!file || loading ){
        return (
            <div>
                No files Selected Please select a file to open 
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <h2 className="text-xl font-bold mb-2">Editing File: {file.name}</h2>

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
