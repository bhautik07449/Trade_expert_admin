import React from "react";
import CommonBox from "../../../../../components/common/common_box";
import { CommonTextField } from "../../../../../components/widgets/common_textField";
import Editor from "../../../../../common/Editor";

export default function TenderFields({ formik, categoryOptions }) {
    return (
        <>
            <CommonBox
                label="Category"
                placeholders="Select Category"
                options={categoryOptions}
                name="category"
                value={formik.values.category}
                onChange={(value) => {
                    formik.setFieldValue("category", value);
                    formik.setFieldValue("subCategory", "");
                    formik.setFieldValue("product", "");
                }}
                disabled={!formik?.values?.country}
                error={formik.touched.category && formik.errors.category}
            />

            <CommonTextField
                label="Level (Central/State/City)"
                placeholder="Tender Level"
                name="tender_level"
                value={formik.values.tender_level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <CommonTextField
                label="Govt / Private"
                placeholder="Govt / Private"
                name="govt_private"
                value={formik.values.govt_private}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <CommonTextField
                label="Department"
                placeholder="Department"
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <CommonTextField
                label="Extra Info"
                placeholder="Extra Info"
                name="extra_info"
                value={formik.values.extra_info}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <Editor
                label="Description"
                value={formik.values.details}
                onChange={(value) => formik.setFieldValue("details", value)}
            />
        </>
    );
}
