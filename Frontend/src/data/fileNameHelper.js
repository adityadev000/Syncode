    export const getLanguageFromFileName = (fileName) => {
    if (!fileName) return 'plaintext'; // fallback

    const ext = fileName.split('.').pop().toLowerCase();

    switch (ext) {
        case 'js':
        case 'jsx':
        return 'javascript';
        case 'ts':
        case 'tsx':
        return 'typescript';
        case 'py':
        return 'python';
        case 'java':
        return 'java';
        case 'c':
        return 'c';
        case 'cpp':
        case 'cc':
        case 'cxx':
        case 'hpp':
        case 'h':
        return 'cpp';
        case 'html':
        return 'html';
        case 'css':
        return 'css';
        case 'json':
        return 'json';
        case 'md':
        return 'markdown';
        case 'sh':
        return 'shell';
        case 'rb':
        return 'ruby';
        case 'go':
        return 'go';
        case 'php':
        return 'php';
        default:
        return 'plaintext'; // fallback
    }
    };
