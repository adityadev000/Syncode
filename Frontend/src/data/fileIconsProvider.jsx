import { SiJavascript, SiPython,  SiC, SiCpp, SiHtml5, SiCss3, SiPhp, SiGo, SiRubyonrails } from 'react-icons/si';
import { MdInsertDriveFile } from 'react-icons/md';
import { FaJava } from 'react-icons/fa';
import { PiFileCppFill } from 'react-icons/pi';

export const getFileIcon = (fileName) => {
    if (!fileName) return <MdInsertDriveFile />; // default file icon

    const ext = fileName.split('.').pop().toLowerCase();

    switch (ext) {
        case 'js':
        case 'jsx':
            return <SiJavascript color="#f0db4f" />;
        case 'ts':
        case 'tsx':
            return <SiJavascript color="#007acc" />; // you can use a TS icon
        case 'py':
            return <SiPython color="#306998" />;
        case 'java':
            return <FaJava color="#f89820" />;
        case 'c':
            return <SiC color="#00599C" />;
        case 'cpp':
        case 'cc':
        case 'cxx':
        case 'hpp':
        case 'h':
            return <PiFileCppFill color="#00599C" />;
        case 'html':
            return <SiHtml5 color="#e34c26" />;
        case 'css':
            return <SiCss3 color="#264de4" />;
        case 'php':
            return <SiPhp color="#777bb3" />;
        case 'go':
            return <SiGo color="#00ADD8" />;
        case 'rb':
            return <SiRubyonrails color="#cc0000" />;
        default:
            return <MdInsertDriveFile />;
    }
};
