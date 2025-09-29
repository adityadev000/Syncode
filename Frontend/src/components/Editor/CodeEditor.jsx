import React, { useEffect, useRef, useState } from 'react'
import {Editor} from '@monaco-editor/react'
import { useDispatch, useSelector } from 'react-redux';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import {setIsFileSynced , trackFileChange, unsetActiveObject} from '../../slices/editorSlice'
import toast from 'react-hot-toast';
import Spinner from '../common/Spinner';


const CodeEditor = () => {

const {project} = useSelector(state => state.project);
const {activeObject} = useSelector(state => state.editor);
const {user} = useSelector(state => state.user);
const userColor = project?.activeUsers?.filter(ele => ele.user._id ===user._id).at(0)?.cursorColor;
const [loader,setLoader] = useState(true);
const dispatch = useDispatch();
const editorContentRef = useRef(activeObject?.content);
const editorRef = useRef(null);
const decorationsRef = useRef(new Map());
const ydocRef = useRef(null);
const providerRef = useRef(null);
const yTextRef = useRef(null);
function handleUnMountCleanUp(){
    providerRef.current?.awareness?.setLocalState(null);
    providerRef.current?.disconnect();
}
useEffect(() => {
if (editorRef.current) {
    editorRef.current.updateOptions({ readOnly: activeObject?.isDeleted });
}
}, [activeObject?.isDeleted]);

useEffect(
    () => {
    dispatch(setIsFileSynced(activeObject?.content===editorContentRef?.current));
    },[activeObject?.content,editorContentRef.current]
)
useEffect(
    () => {
        setLoader(true);
        // init the yjs components 
        // make a new ydoc which is shared
        const ydoc = new Y.Doc();
        // initialise the provider
        const provider = new WebsocketProvider(
        `${process.env.REACT_APP_YJS_SERVER}`,
        activeObject?._id,
        ydoc,
        );
        const ytext = ydoc.getText('monaco');
        // ✅ Set default content only if Yjs is empty (first time)
        provider.on('synced', (isSynced) => {
        if (isSynced && ytext.toString().length === 0 && activeObject?.content) {
            ytext.insert(0, activeObject?.content);
        }
        setLoader(false);
        });
        // store the references
        ydocRef.current = ydoc;
        providerRef.current = provider;
        yTextRef.current = ytext;
        //check yjs conected or not
        provider.on('status',(event) => {
        console.log(`[YJS STATUS]: ${event.status}`) // gives connected or disconnected
        })
        //add event listener for cleanup
        window.addEventListener('beforeunload',handleUnMountCleanUp);
        // on umount cleanup
        return () => {
        if (yTextRef.current?._observer) {
            yTextRef.current.unobserve(yTextRef.current._observer);
        }
        handleUnMountCleanUp();
        provider.destroy();
        ydoc.destroy();
        window.removeEventListener('beforeunload',handleUnMountCleanUp);
        }
        
    },[activeObject?._id]
)
// for the cursor things etc 
function handleEditorMount(editor,monaco){
    editorRef.current = editor;
    const provider = providerRef.current;
    const ytext = yTextRef.current;
    editor.onDidAttemptReadOnlyEdit((e) => {
    if(activeObject?.isDeleted)
        toast.error('This File is Deleted Retrive it to Edit');
    });
    //binding with monaco
    const monacoBinding = new MonacoBinding(
    ytext,
    editor.getModel(),
    new Set([editor]),
    provider.awareness,
    );
    // set the color part
    provider.awareness.setLocalStateField("user", {
    name: `${user.firstName} ${user?.lastName}`,
    color: userColor,
    });
    // on cursor chnage of tthis user send this data to provider 
    editor.onDidChangeCursorPosition(
    (event) => {
        const {lineNumber,column} = event.position;
        provider.awareness.setLocalStateField('cursor',{
        line:lineNumber,
        column,
        });
    }
    );
    // now for displaying the cursors of other users
    provider.awareness.on('change',() => {
    // get all the states
    const states = provider.awareness.getStates();
    const currentActiveClients = new Set(states.keys());
    // remove the users who have left remove thier decorations
    for(const [clientId,oldDecorations] of decorationsRef.current){
        if(!currentActiveClients.has(clientId)){
        editor.deltaDecorations(oldDecorations,[]);
        decorationsRef.current.delete(clientId);
        const styleElement = document.getElementById(`remote-cursor-color-${clientId}`);
        if(styleElement) styleElement.remove();
        }
    }
    // for each state create the decoration of cursor
    states.forEach((state,clientId) => {
        if(clientId === provider.doc.clientID) return;
        const oldDecoration = decorationsRef.current.get(clientId) || [];
        if(state.cursor && state.user){
        const {line,column} = state.cursor;
        const userColor = state.user.color || 'yellow';
        const newDecoration = editor.deltaDecorations(oldDecoration,[
            {
            range: new monaco.Range(line,column,line,column),
            options:{
                className:'remote-cursor',
                hoverMessage:{value:`User ${state.user.name}`},
                beforeContentClassName: `remote-cursor-color-${clientId}`,
            }
            }
        ]);
        decorationsRef.current.set(clientId,newDecoration);
        if(!document.getElementById(`remote-cursor-color-${clientId}`)){
            const styleElement = document.createElement('style');
            styleElement.id = `remote-cursor-color-${clientId}`;
            styleElement.innerHTML = `
            .remote-cursor-color-${clientId} {
                border: 2px solid ${userColor};
                opacity: 0.8;
            }
            `;
            document.head.appendChild(styleElement);
        }
        }
        else{
        // means the user has left
        editor.deltaDecorations(oldDecoration,[]);
        decorationsRef.current.delete(clientId);
        }
    })
    });
    editor.focus();
}
if(activeObject === null ){
    return(<div>No file is selected</div>)
}
if(loader){
    return <Spinner/>
}
return (
    <div className='h-full w-full'>
        <Editor
        key={`${activeObject._id}`} // 🔑 Important: force remount on tab change
        theme='vs-dark'
        options={{
        fontSize: 18, // Set editor font size
        automaticLayout: true,
        readOnly:(activeObject?.isDeleted ) ,            
        fontFamily: 'Fira Code',   // Custom font family (if available)
        fontLigatures: true,       // Enable ligatures (for fonts like Fira Code)
        lineHeight: 24,            // Line height
        letterSpacing: 0.5, 
        }}
        onChange={(newValue) => {
        const payload = {
            projectId:project._id,
            item:activeObject,
            content:newValue,
        }
        dispatch(trackFileChange(payload));
        editorContentRef.current = newValue;
        }}
        onMount={handleEditorMount}
    />
    </div>
)
}
export default CodeEditor