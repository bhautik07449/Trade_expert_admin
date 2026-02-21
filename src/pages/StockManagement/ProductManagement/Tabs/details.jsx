import { useState } from 'react';
import Editor from '../../../../common/Editor';
import { CommonTextField } from '../../../../components/widgets/common_textField';

export default function Details({ formik }) {
    const [editorData, setEditorData] = useState('');

    return (
        <div className='grid grid-cols-2 gap-6'>
            <div className='grid-cols-1 space-y-5'>
                <Editor editorData={editorData} setEditorData={setEditorData} label="Description" />
                <CommonTextField
                    type="textarea"
                    label="Seasonal Chart"
                    name="seasonalChart"
                    value={formik.values.seasonalChart}
                    onChange={formik.handleChange}
                />
                <Editor editorData={editorData} setEditorData={setEditorData} label="Product specific policy" />
            </div>
            <div className='grid-cols-1 space-y-5'>
                <div className='border p-4'>
                    <label className="text-sm font-bold">Technical Specification</label>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <CommonTextField
                            placeholder="Key"
                        />
                        <CommonTextField
                            placeholder="Value"
                        />
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2"
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className='border p-4'>
                    <label className="text-sm font-bold">Commercial Aspect</label>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <CommonTextField
                            placeholder="Key"
                        />
                        <CommonTextField
                            placeholder="Value"
                        />
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}