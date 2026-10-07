import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../components/ui/use-toast";
import { CommonTextField } from '../../../components/widgets/common_textField';
import CommonButton from '../../../components/widgets/common_button';
import { Card } from '../../../components/ui/card';
import BackPath from "../../../components/common/BackPath";
import DevelopPrepositionsService from '../../../service/develop_prepositions.service';
import CommonBox from '../../../components/common/common_box';

export default function AddDevelopPrepositions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);

  const initialValues = {
    belief: list ? list?.belief : "",
    purpose: list ? list?.purpose : "",
    goal: list ? list?.goal : "",
    name: list ? list?.name : "",
    aim: list ? list?.aim : ""
  };

  const validationSchema = Yup.object().shape({
    belief: Yup.string().required("Belief is required"),
    purpose: Yup.string().required("Purpose is required"),
    goal: Yup.string().required("Goal is required"),
    name: Yup.string().required("Name is required"),
    aim: Yup.string().required("Aim is required")
  });

  const beliefOptions = [
    { label: "Sustainability", value: "sustainability" },
    { label: "Innovation", value: "innovation" },
    { label: "Customer First", value: "customer_first" }
  ];

  const purposeOptions = [
    { label: "Eco-friendly products", value: "eco_friendly" },
    { label: "Market disruption", value: "disruption" },
    { label: "Improve service", value: "improve_service" }
  ];

  const goalOptions = [
    { label: "Reduce carbon footprint", value: "reduce_carbon" },
    { label: "Launch new tech", value: "launch_tech" },
    { label: "Increase retention", value: "increase_retention" }
  ];

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        let res;
        if (id) {
          res = await DevelopPrepositionsService.updateDevelopPreposition(id, values);
        } else {
          res = await DevelopPrepositionsService.addDevelopPreposition(values);
        }

        if (res?.data?.message || res?.status === 200 || res?.status === 201) {
          toast({
            variant: "success",
            title: "Success",
            description: res?.data?.message || `Develop Preposition ${id ? "Updated" : "Created"} successfully`,
          });
          navigate('/populization-connect/develop-prepositions');
        } else {
          toast({
            variant: "destructive",
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
        resetForm();
      }
    },
  });

  const fetchDevelopPreposition = async () => {
    try {
      const res = await DevelopPrepositionsService.getDevelopPrepositionById(id);
      if (res?.data?.data) {
        setList(res.data.data);
      }
    } catch (error) {
      // handled
    }
  };

  useEffect(() => {
    if (id) {
      fetchDevelopPreposition();
    }
  }, [id]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <BackPath />
        <h3 className="h5-bold">{id ? "Edit" : "Add"} Develop Preposition</h3>
      </div>

      <Card className="p-6">
        <form className="grid gap-6" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommonBox
              label="Find a belief"
              placeholders="Select belief"
              options={beliefOptions}
              value={formik.values.belief}
              onChange={(value) => {
                formik.setFieldValue("belief", value);
              }}
              error={formik.touched.belief && formik.errors.belief}
            />

            <CommonBox
              label="Find a Purpose"
              placeholders="Select purpose"
              options={purposeOptions}
              value={formik.values.purpose}
              onChange={(value) => {
                formik.setFieldValue("purpose", value);
              }}
              error={formik.touched.purpose && formik.errors.purpose}
            />

            <CommonBox
              label="Find a Goal"
              placeholders="Select goal"
              options={goalOptions}
              value={formik.values.goal}
              onChange={(value) => {
                formik.setFieldValue("goal", value);
              }}
              error={formik.touched.goal && formik.errors.goal}
            />

            <CommonTextField
              label="Name a Preposition."
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Name"
              error={formik.touched.name && formik.errors.name}
            />
          </div>

          <CommonTextField
            label="Aim"
            type="textarea"
            rows={6}
            name="aim"
            value={formik.values.aim}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Aim"
            error={formik.touched.aim && formik.errors.aim}
          />

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
        </form>
      </Card>
    </div >
  );
};