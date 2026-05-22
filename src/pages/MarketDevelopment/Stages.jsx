import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CommonTextField } from "../../components/widgets/common_textField";
import { useState } from "react";
import CommonBox from "../../components/common/common_box";

export default function Stages({ formik, setStages, stages }) {
    const [fields, setFields] = useState([]);
    const [options, setOptions] = useState([]);

    const fieldTypesWithOptions = ["select", "radio", "checkbox"];

    const addOption = () => {
        if (!formik.values.optionValue.trim()) return;

        setOptions((prev) => [...prev, formik.values.optionValue]);
        formik.setFieldValue("optionValue", "");
    };

    const removeOption = (index) => {
        setOptions((prev) => prev.filter((_, i) => i !== index));
    };

    const addField = () => {
        const fieldLabel = formik.values.fieldLabel;
        const fieldType = formik.values.fieldType;

        if (!fieldLabel.trim()) {
            formik.setFieldTouched("fieldLabel", true);
            return;
        }

        const needsOptions = fieldTypesWithOptions.includes(fieldType);

        if (needsOptions && options.length === 0) return;

        const newField = {
            id: Date.now(),
            label: fieldLabel,
            type: fieldType,
            options: needsOptions ? options : [],
        };

        setFields((prev) => [...prev, newField]);

        formik.setFieldValue("fieldLabel", "");
        formik.setFieldValue("fieldType", "text");
        formik.setFieldValue("optionValue", "");
        setOptions([]);
    };

    const removeField = (id) => {
        setFields((prev) => prev.filter((field) => field.id !== id));
    };

    const addStage = () => {
        if (!formik.values.stageName.trim()) {
            formik.setFieldTouched("stageName", true);
            return;
        }

        if (fields.length === 0) return;

        const newStage = {
            id: Date.now(),
            name: formik.values.stageName,
            fields: fields,
        };

        setStages((prev) => [...prev, newStage]);

        formik.setFieldValue("stageName", "");
        formik.setFieldValue("fieldLabel", "");
        formik.setFieldValue("fieldType", "text");
        formik.setFieldValue("optionValue", "");

        setFields([]);
        setOptions([]);
    };

    const removeStage = (id) => {
        setStages((prev) => prev.filter((stage) => stage.id !== id));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 p-6 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Create Stage
                </h2>

                <CommonTextField
                    label="Stage Name"
                    placeholder="Enter stage name"
                    name="stageName"
                    value={formik.values.stageName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.stageName && !formik.values.stageName && "Stage name is required"}
                />

                <div className="border rounded-2xl p-4 space-y-4">
                    <h3 className="font-bold text-lg">Add Field</h3>

                    <CommonTextField
                        label="Field Label"
                        placeholder="Enter field label"
                        name="fieldLabel"
                        value={formik.values.fieldLabel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fieldLabel && !formik.values.fieldLabel && "Field label is required"}
                    />

                    <CommonBox
                        label="Field Type"
                        placeholders="Select Field Type"
                        options={[
                            { label: "Text", value: "text" },
                            { label: "Number", value: "number" },
                            { label: "Textarea", value: "textarea" },
                            { label: "Select", value: "select" },
                            { label: "Radio", value: "radio" },
                            { label: "Checkbox", value: "checkbox" },
                            { label: "File", value: "file" },
                            { label: "Date", value: "date" },
                        ]}
                        name="fieldType"
                        value={formik.values.fieldType}
                        onChange={(value) => formik.setFieldValue("fieldType", value)}
                        error={formik.touched.fieldType && formik.errors.fieldType}
                    />

                    {fieldTypesWithOptions.includes(formik.values.fieldType) && (
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="flex-1">
                                    <CommonTextField
                                        label="Option Value"
                                        placeholder="Enter option value"
                                        name="optionValue"
                                        value={formik.values.optionValue}
                                        onChange={formik.handleChange}
                                    />
                                </div>

                                <div className="pt-7">
                                    <Button type="button" onClick={addOption}>
                                        Add
                                    </Button>
                                </div>
                            </div>

                            {options.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {options.map((option, index) => (
                                        <span
                                            key={index}
                                            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {option}

                                            <button
                                                type="button"
                                                onClick={() => removeOption(index)}
                                                className="ml-2 text-red-500"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Please add at least one option.
                                </p>
                            )}
                        </div>
                    )}

                    <Button type="button" onClick={addField} className="w-full">
                        Add Field
                    </Button>
                </div>

                {fields.length > 0 && (
                    <div>
                        <h3 className="font-bold mb-3">Current Fields</h3>

                        <div className="space-y-3">
                            {fields.map((field) => (
                                <div
                                    key={field.id}
                                    className="border rounded-xl px-4 py-3 flex justify-between items-start"
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {field.label}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Type: {field.type}
                                        </p>

                                        {field.options.length > 0 && (
                                            <p className="text-sm text-gray-500">
                                                Options: {field.options.join(", ")}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeField(field.id)}
                                        className="text-red-500 font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {fields.length === 0 && (
                    <p className="text-sm text-gray-500">
                        Add at least one field before saving stage.
                    </p>
                )}

                <Button
                    type="button"
                    onClick={addStage}
                    className="w-full"
                    disabled={fields.length === 0}
                >
                    Save Stage
                </Button>
            </Card>

            <Card className="lg:col-span-2 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                    Stage Preview
                </h2>

                {stages.length === 0 ? (
                    <p className="text-gray-500">No stages added yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {stages.map((stage, index) => (
                            <div
                                key={stage.id}
                                className="border rounded-2xl p-5 bg-[#fbf8f4] relative"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeStage(stage.id)}
                                    className="absolute top-4 right-4 bg-red-500 text-white w-7 h-7 rounded-full"
                                >
                                    ×
                                </button>

                                <div className="flex items-center gap-3 mb-5">
                                    <span className="w-9 h-9 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold">
                                        {index + 1}
                                    </span>

                                    <h3 className="text-xl font-bold text-gray-900">
                                        {stage.name}
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {stage.fields.map((field) => (
                                        <div key={field.id}>
                                            <label className="block font-semibold mb-2">
                                                {field.label}
                                            </label>

                                            {field.type === "text" && (
                                                <CommonTextField
                                                    placeholder={field.label}
                                                    name={field.label}
                                                />
                                            )}

                                            {field.type === "number" && (
                                                <CommonTextField
                                                    type="number"
                                                    placeholder={field.label}
                                                    name={field.label}
                                                />
                                            )}

                                            {field.type === "textarea" && (
                                                <CommonTextField
                                                    type="textarea"
                                                    rows={3}
                                                    placeholder={field.label}
                                                    name={field.label}
                                                />
                                            )}

                                            {field.type === "date" && (
                                                <CommonTextField
                                                    type="date"
                                                    name={field.label}
                                                />
                                            )}

                                            {field.type === "file" && (
                                                <input
                                                    type="file"
                                                    className="w-full border rounded-xl px-4 py-3"
                                                />
                                            )}

                                            {field.type === "select" && (
                                                <select className="w-full border rounded-xl px-4 py-3">
                                                    <option value="">Select {field.label}</option>
                                                    {field.options.map((option, i) => (
                                                        <option key={i} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}

                                            {field.type === "radio" && (
                                                <div className="space-y-2">
                                                    {field.options.map((option, i) => (
                                                        <label
                                                            key={i}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name={`radio-${field.id}`}
                                                                value={option}
                                                            />
                                                            {option}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}

                                            {field.type === "checkbox" && (
                                                <div className="space-y-2">
                                                    {field.options.map((option, i) => (
                                                        <label
                                                            key={i}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                value={option}
                                                            />
                                                            {option}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}