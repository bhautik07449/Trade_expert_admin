import { useState } from "react";
import Editor from "../../../../common/Editor";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Trash2 } from "lucide-react";

export default function Details({ formik }) {

    const [techKey, setTechKey] = useState("");
    const [techValue, setTechValue] = useState("");

    const [comKey, setComKey] = useState("");
    const [comValue, setComValue] = useState("");

    const addTechnical = () => {
        if (!techKey || !techValue) return;

        formik.setFieldValue("technicalSpecification", [
            ...formik.values.technicalSpecification,
            { key: techKey, value: techValue }
        ]);

        setTechKey("");
        setTechValue("");
    };

    const addCommercial = () => {
        if (!comKey || !comValue) return;

        formik.setFieldValue("commercialAspect", [
            ...formik.values.commercialAspect,
            { key: comKey, value: comValue }
        ]);

        setComKey("");
        setComValue("");
    };

    const removeTechnical = (index) => {
        const updated = [...formik.values.technicalSpecification];
        updated.splice(index, 1);

        formik.setFieldValue("technicalSpecification", updated);
    };

    const removeCommercial = (index) => {
        const updated = [...formik.values.commercialAspect];
        updated.splice(index, 1);

        formik.setFieldValue("commercialAspect", updated);
    };

    return (
        <div className="grid grid-cols-2 gap-6">

            <div className="space-y-5">
                <Editor
                    label="Description"
                    value={formik.values.description}
                    onChange={(value) => formik.setFieldValue("description", value)}
                />

                <CommonTextField
                    type="textarea"
                    label="Seasonal Chart"
                    name="seasonalChart"
                    value={formik.values.seasonalChart}
                    onChange={formik.handleChange}
                />

                <Editor
                    label="Product specific policy"
                    value={formik.values.policy}
                    onChange={(value) => formik.setFieldValue("policy", value)}
                />

            </div>

            <div className="space-y-6">
                <div className="border p-4 space-y-4">
                    <label className="text-sm font-bold">Technical Specification</label>

                    <div className="grid grid-cols-3 gap-4 items-center">
                        <CommonTextField
                            placeholder="Key"
                            value={techKey}
                            onChange={(e) => setTechKey(e.target.value)}
                        />

                        <CommonTextField
                            placeholder="Value"
                            value={techValue}
                            onChange={(e) => setTechValue(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={addTechnical}
                            className="bg-blue-500 text-white px-4 py-2"
                        >
                            Add
                        </button>
                    </div>

                    {formik.values.technicalSpecification.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between border p-2 rounded"
                        >
                            <span>
                                <b>{item.key}</b> : {item.value}
                            </span>

                            <button
                                type="button"
                                onClick={() => removeTechnical(index)}
                                className="text-red-500"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="border p-4 space-y-4">

                    <label className="text-sm font-bold">Commercial Aspect</label>

                    <div className="grid grid-cols-3 gap-4 items-center">

                        <CommonTextField
                            placeholder="Key"
                            value={comKey}
                            onChange={(e) => setComKey(e.target.value)}
                        />

                        <CommonTextField
                            placeholder="Value"
                            value={comValue}
                            onChange={(e) => setComValue(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={addCommercial}
                            className="bg-blue-500 text-white px-4 py-2"
                        >
                            Add
                        </button>

                    </div>

                    {formik.values.commercialAspect.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between border p-2 rounded"
                        >
                            <span>
                                <b>{item.key}</b> : {item.value}
                            </span>

                            <button
                                type="button"
                                onClick={() => removeCommercial(index)}
                                className="text-red-500"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
}