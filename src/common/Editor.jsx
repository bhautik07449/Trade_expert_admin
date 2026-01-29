import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';

export default function Editor({ editorData, setEditorData, label }) {

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorData(data);
    };

    return (
        <div>
            {label && <label className="text-sm font-bold">{label}</label>}
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleEditorChange}
            />
            <style jsx>{`
                        .ck-editor__editable {
                            min-height: 300px;
                        }
                    `}
            </style>
        </div>
    )
}