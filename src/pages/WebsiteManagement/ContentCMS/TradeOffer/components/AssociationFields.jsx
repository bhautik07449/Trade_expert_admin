import React from "react";
import { CommonTextField } from "../../../../../components/widgets/common_textField";
import Editor from "../../../../../common/Editor";
import CommonBox from "../../../../../components/common/common_box";

export default function AssociationFields({ formik }) {
    return (
        <>
            <CommonTextField
                label="State"
                placeholder="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <CommonTextField
                label="City"
                placeholder="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <CommonTextField
                label="Company Type"
                placeholder="Company Type"
                name="company_type"
                value={formik.values.company_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <CommonTextField
                label="Opportunity"
                placeholder="Opportunity"
                name="opportunity"
                value={formik.values.opportunity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <CommonTextField
                label="Company Name"
                placeholder="Company Name"
                name="company_name"
                value={formik.values.company_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <CommonTextField
                label="Description"
                placeholder="Description"
                name="description"
                type="textarea"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <CommonBox
                label="Status"
                placeholders="Select Category Status"
                options={[
                    { label: "Active", value: "active" },
                    { label: "Pending", value: "pending" },
                    { label: "Blocked", value: "blocked" }
                ]}
                value={formik.values.status}
                onChange={(value) => formik.setFieldValue("status", value)}
                error={formik.touched.status && formik.errors.status}
            />
            <Editor
                label="EOI"
                value={formik.values.eoi}
                onChange={(value) => formik.setFieldValue("eoi", value)}
            />
            <Editor
                label="MOU"
                value={formik.values.mou}
                onChange={(value) => formik.setFieldValue("mou", value)}
            />
            <Editor
                label="MOA"
                value={formik.values.moa}
                onChange={(value) => formik.setFieldValue("moa", value)}
            />
            <Editor
                label="MOIS"
                value={formik.values.mois}
                onChange={(value) => formik.setFieldValue("mois", value)}
            />
            <Editor
                label="TRACK PROGRESS"
                value={formik.values.track_progress}
                onChange={(value) => formik.setFieldValue("track_progress", value)}
            />
        </>
    );
}
