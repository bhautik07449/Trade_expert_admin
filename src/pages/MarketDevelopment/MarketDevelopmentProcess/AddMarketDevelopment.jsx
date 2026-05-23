import BackPath from "../../../components/common/BackPath";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { toast } from "../../../components/ui/use-toast";
import MarketDevelopmentservice from "../../../service/marketdevelopment.service";
import { useNavigate, useParams } from "react-router";
import Process from "./process";
import Stages from "./Stages";

export default function AddMarketDevelopment() {
    const { id } = useParams()

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
        onSubmit: async ({ setSubmitting }) => {
            try {
                const payload = {
                    market_data: {
                        processSteps: steps,
                        stages: stages,
                    },
                };

                let res;

                if (id) {
                    res = await MarketDevelopmentservice.updateMarketDevelopment(id, payload);
                } else {
                    res = await MarketDevelopmentservice.addMarketDevelopment(payload);
                }

                if (res?.status === 200 || res?.status === 201) {
                    navigate("/market-development/process");

                    toast({
                        variant: "success",
                        title: "Market Development Saved",
                        description: res?.data?.message || "Saved successfully",
                    });
                }
            } catch (error) {
                console.log("submit error", error);

                toast({
                    variant: "error",
                    title: "Market Development Failed",
                    description:
                        error?.response?.data?.message ||
                        error?.message ||
                        "Market Development Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const getData = async (id) => {
        try {
            const res = await MarketDevelopmentservice.getByid(id)

            if (res) {
                const marketData = res?.data?.data;

                setSteps(marketData?.market_data?.processSteps || []);
                setStages(marketData?.market_data?.stages || []);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (id) {
            getData(id)
        }
    }, [id])

    return (
        <div className="grid gap-6">
            <div className="flex justify-between items-center gap-4">
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Market Development</h3>
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