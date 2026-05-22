import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CommonTextField } from "../../components/widgets/common_textField";

export default function Process({ formik, setSteps, steps }) {

    const addStep = () => {
        if (!formik.values.stepLabel.trim()) {
            formik.setFieldTouched("stepLabel", true);
            return;
        }

        setSteps((prev) => [
            ...prev,
            {
                id: Date.now(),
                label: formik.values.stepLabel,
            },
        ]);

        formik.setFieldValue("stepLabel", "");
    };

    const removeStep = (id) => {
        setSteps((prev) => prev.filter((step) => step.id !== id));
    };

    return (
        <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
                Add Process Step
            </h2>

            <div className="flex items-start gap-3">
                <div className="flex-1">
                    <CommonTextField
                        label="Step Label"
                        placeholder="Enter step label"
                        name="stepLabel"
                        value={formik.values.stepLabel}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.stepLabel && !formik.values.stepLabel && "Step label is required"}
                    />
                </div>

                <div className="pt-7">
                    <Button type="button" onClick={addStep}>
                        Add
                    </Button>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold mb-4">Process Preview</h3>

                {steps.length === 0 ? (
                    <p className="text-gray-500">No steps added yet.</p>
                ) : (
                    <div className="flex items-center gap-4 flex-wrap">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center gap-4">
                                <div className="relative bg-[#fbf8f4] border border-[#d8c8b8] rounded-2xl px-10 py-5 min-w-[220px] text-center">
                                    <button
                                        type="button"
                                        onClick={() => removeStep(step.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs"
                                    >
                                        ×
                                    </button>

                                    <div className="mx-auto mb-3 w-10 h-10 bg-orange-400 rounded-full text-white flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>

                                    <p className="font-bold text-gray-900">
                                        {step.label}
                                    </p>
                                </div>

                                {index !== steps.length - 1 && (
                                    <span className="text-3xl text-gray-400">→</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}