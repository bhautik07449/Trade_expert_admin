import BackPath from "../../components/common/BackPath";
import { useState } from "react";
import { useFormik } from "formik";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import Process from "./process";
import Stages from "./Stages";
import { toast } from "../../components/ui/use-toast";
import MarketDevelopmentservice from "../../service/marketdevelopment.service";
import { useNavigate } from "react-router";

export default function AddMarketDevelopment() {
    const [activeTab, setActiveTab] = useState("steps");
    const navigate = useNavigate();

    const [stages, setStages] = useState([]);
    const [steps, setSteps] = useState([]);

    const formik = useFormik({
        initialValues: {
            stepLabel: "",
            stageName: "",
            fieldLabel: "",
            fieldType: "text",
            optionValue: "",
        },
        onSubmit: async ({ setSubmitting, resetForm }) => {
            try {
                const payload = {
                    market_data: {
                        processSteps: steps,
                        stages: stages,
                    }
                };

                console.log("values:", payload);

                let res = await MarketDevelopmentservice.addMarketDevelopment(payload);

                if (res) {

                    resetForm()
                    navigate("/market-development")
                    toast({
                        variant: "success",
                        title: "Market Development Saved",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Market Development Failed",
                    description: error?.response?.data?.message || "Market Development Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="grid gap-6">
            <div className="flex justify-between items-center gap-4">
                <h3 className="h5-bold">Add Market Development</h3>
                <BackPath />
            </div>

            <form
                onSubmit={formik.handleSubmit}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                }}
            >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="steps">Process Steps</TabsTrigger>
                        <TabsTrigger value="stages">Stages</TabsTrigger>
                    </TabsList>

                    <TabsContent value="steps">
                        <Process
                            formik={formik}
                            steps={steps}
                            setSteps={setSteps}
                        />
                    </TabsContent>

                    <TabsContent value="stages">
                        <Stages
                            formik={formik}
                            stages={stages}
                            setStages={setStages}
                        />
                    </TabsContent>

                    {activeTab === "stages" && (
                        <div className="flex justify-end">
                            <Button type="submit" isLoading={formik.isSubmitting}>
                                {formik.isSubmitting ? "Saving..." : "Save Market Development"}
                            </Button>
                        </div>
                    )}
                </Tabs>
            </form>
        </div>
    );
}