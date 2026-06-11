import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function Editor({ value, onChange, label }) {

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        onChange(data);
    };

    return (
        <div>
            {label && <label className="text-sm font-bold">{label}</label>}
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={handleEditorChange}
            />
            <style jsx>{`
                .ck-editor__editable {
                    min-height: 300px;
                }
            `}</style>
        </div>
    );
}