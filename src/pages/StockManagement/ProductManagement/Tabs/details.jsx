import { useState } from 'react';
import Editor from '../../../../common/Editor';

export default function Details() {
    const [editorData, setEditorData] = useState('');

    return (
        <div>
            <Editor editorData={editorData} setEditorData={setEditorData} />            
        </div>
    );
}