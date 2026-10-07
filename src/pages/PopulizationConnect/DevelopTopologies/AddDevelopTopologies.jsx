import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCareer } from "../../../store/slice/careerSlice";
import { fetchDevelopPrepositions } from "../../../store/slice/developPrepositionsSlice";

import { CommonTextField } from '../../../components/widgets/common_textField';
import CommonBox from "../../../components/common/common_box";
import CommonButton from '../../../components/widgets/common_button';
import { Card } from '../../../components/ui/card';
import BackPath from "../../../components/common/BackPath";
import DevelopTopologiesService from '../../../service/develop_topologies.service';

export default function AddDevelopTopologies() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { list: prepositions } = useSelector((state) => state.developPrepositions);
    const { list: candidates } = useSelector((state) => state.career);

    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [list, setList] = useState(null);

    const initialValues = {
        prepositionId: list && list.prepositionId ? String(list.prepositionId) : "",
        aim: list ? list.aim : "",
        candidateId: list && list.candidateId ? String(list.candidateId) : ""
    };

    const validationSchema = Yup.object().shape({
        prepositionId: Yup.string().required("Preposition is required"),
        candidateId: Yup.string().required("Candidate is required")
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                let res;
                const payload = {
                    prepositionId: values.prepositionId,
                    candidateId: values.candidateId
                };

                if (id) {
                    res = await DevelopTopologiesService.updateDevelopTopology(id, payload);
                } else {
                    res = await DevelopTopologiesService.addDevelopTopology(payload);
                }

                if (res?.data?.message || res?.status === 200 || res?.status === 201) {
                    toast({
                        variant: "success",
                        title: "Success",
                        description: res?.data?.message || `Develop Topology ${id ? "Updated" : "Created"} successfully`,
                    });
                    navigate('/populization-connect/develop-topologies');
                } else {
                    toast({
                        variant: "error",
                        title: "Error",
                        description: "Something went wrong",
                    });
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Error",
                    description: error?.response?.data?.message || "Something went wrong",
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const fetchDevelopTopology = async () => {
        try {
            const res = await DevelopTopologiesService.getDevelopTopologyById(id);
            if (res?.data?.data) {
                const data = res.data.data;
                const prep = prepositions.find(p => String(p.id) === String(data.prepositionId));
                if (prep) data.aim = prep.aim;

                setList(data);

                // If it's edit, manually trigger candidate selection
                const cand = candidates.find(c => String(c.id) === String(data.candidateId));
                if (cand) setSelectedCandidate(cand);
            }
        } catch (error) {
            // Error handled silently
        }
    };

    useEffect(() => {
        dispatch(fetchDevelopPrepositions());
        dispatch(fetchCareer());
    }, [dispatch]);

    useEffect(() => {
        if (id && candidates.length > 0 && prepositions.length > 0) {
            fetchDevelopTopology();
        }
    }, [id, candidates.length, prepositions.length]);

    return (
        <div className="grid gap-4 lg:gap-6">
            <BackPath title={id ? "Edit Develop Topologies" : "Add Develop Topologies"} />

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6 border-b pb-2">Develop Topologies</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-6">

                        <div className="flex flex-col gap-2 max-w-md mx-auto text-center">
                            <CommonBox
                                label={<>Select a Preposition <span className="text-red-500">*</span></>}
                                options={prepositions.map(p => ({ label: p.name, value: String(p.id) }))}
                                value={formik.values.prepositionId}
                                onChange={(value) => {
                                    formik.setFieldValue("prepositionId", value);
                                    const selectedPrep = prepositions.find(p => String(p.id) === String(value));
                                    if (selectedPrep) {
                                        formik.setFieldValue("aim", selectedPrep.aim);
                                    } else {
                                        formik.setFieldValue("aim", "");
                                    }
                                }}
                                placeholders="Select a Preposition"
                                error={formik.touched.prepositionId && formik.errors.prepositionId}
                            />
                        </div>

                        <div className="flex flex-col gap-2 max-w-md mx-auto">
                            <CommonTextField
                                label="After Selection, Type a Aim."
                                name="aim"
                                value={formik.values.aim}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Aim will automatically appear here"
                                disabled={true}
                            />
                        </div>

                        <div className="mt-8 border p-6 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-medium text-center mb-6">Select Interested candidate to Accommodate</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <CommonBox
                                    label="Select Name"
                                    options={candidates.map(c => ({ label: c.name, value: String(c.id) }))}
                                    value={formik.values.candidateId}
                                    onChange={(value) => {
                                        formik.setFieldValue("candidateId", value);
                                        const cand = candidates.find(c => String(c.id) === String(value));
                                        setSelectedCandidate(cand || null);
                                    }}
                                    placeholders="Select Candidate by Name"
                                />
                                <CommonBox
                                    label="Select Email"
                                    options={candidates.map(c => ({ label: c.email, value: String(c.id) }))}
                                    value={formik.values.candidateId}
                                    onChange={(value) => {
                                        formik.setFieldValue("candidateId", value);
                                        const cand = candidates.find(c => String(c.id) === String(value));
                                        setSelectedCandidate(cand || null);
                                    }}
                                    placeholders="Select Candidate by Email"
                                />
                                <CommonBox
                                    label="Select Contact"
                                    options={candidates.map(c => ({ label: c.contact, value: String(c.id) }))}
                                    value={formik.values.candidateId}
                                    onChange={(value) => {
                                        formik.setFieldValue("candidateId", value);
                                        const cand = candidates.find(c => String(c.id) === String(value));
                                        setSelectedCandidate(cand || null);
                                    }}
                                    placeholders="Select Candidate by Contact"
                                />
                            </div>

                            {formik.touched.candidateId && formik.errors.candidateId && (
                                <div className="text-red-500 text-sm mt-1 mb-4 text-center">{formik.errors.candidateId}</div>
                            )}

                            <div className="bg-white border rounded-lg p-4 min-h-[200px] flex flex-col justify-center">
                                {selectedCandidate ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-3">Name</th>
                                                    <th className="px-4 py-3">Email</th>
                                                    <th className="px-4 py-3">Contact</th>
                                                    <th className="px-4 py-3">Age</th>
                                                    <th className="px-4 py-3">Gender</th>
                                                    <th className="px-4 py-3">Education</th>
                                                    <th className="px-4 py-3">Experience</th>
                                                    <th className="px-4 py-3">Country</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="px-4 py-3 font-medium text-gray-900">{selectedCandidate.name}</td>
                                                    <td className="px-4 py-3">{selectedCandidate.email}</td>
                                                    <td className="px-4 py-3">{selectedCandidate.contact}</td>
                                                    <td className="px-4 py-3">{selectedCandidate.age}</td>
                                                    <td className="px-4 py-3">{selectedCandidate.gender}</td>
                                                    <td className="px-4 py-3">{selectedCandidate.education}</td>
                                                    <td className="px-4 py-3">{selectedCandidate.experience}</td>
                                                    <td className="px-4 py-3">{selectedCandidate.country}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 italic py-8">
                                        Show Registered Details in Table here. <br />
                                        (Not selected or Not found)
                                    </div>
                                )}
                            </div>
                            <div className="text-center text-sm text-gray-500 mt-2">
                                Details filled up in Join As a Service Personnel.
                            </div>
                        </div>

                        <div className="flex justify-start gap-3 pt-5 border-t">
                            <CommonButton
                                type="button"
                                variant="outline"
                                onClick={() => formik.resetForm()}
                            >
                                Cancel
                            </CommonButton>

                            <CommonButton
                                type="submit"
                                isLoading={formik.isSubmitting}
                                disabled={!formik.isValid}
                            >
                                {id ? "Update" : "Create"}
                            </CommonButton>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
};