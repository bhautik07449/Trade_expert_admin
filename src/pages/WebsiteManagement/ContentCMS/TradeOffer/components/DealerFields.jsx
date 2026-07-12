import React, { useEffect, useMemo } from "react";
import CommonBox from "../../../../../components/common/common_box";
import { useDispatch, useSelector } from "react-redux";
import { fetchFranchise } from "../../../../../store/slice/franchiseSlice";
import ImageUploadField from "../../../../../components/common/ImageUploadField";
import Editor from "../../../../../common/Editor";
import { CommonTextField } from "../../../../../components/widgets/common_textField";

export default function DealerFields({ formik, categoryOptions }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFranchise());
    }, []);

    const { type: franchise } = useSelector(
        (state) => state.franchise
    );

    const franchiseOptions = useMemo(() => {
        const franchiseArray = Array.isArray(franchise) ? franchise : (franchise?.data || []);

        return franchiseArray
            .filter((cat) => !formik?.values?.country || cat.country === formik.values.country)
            .map((cat) => ({
                label: cat.franchise_type,
                value: cat.id
            }));
    }, [franchise, formik?.values?.country]);

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

            <CommonBox
                label="Franchise"
                placeholders="Select Franchise"
                options={franchiseOptions}
                name="franchise_type"
                value={formik.values.franchise_type}
                onChange={(value) => {
                    formik.setFieldValue("franchise_type", value);
                }}
                disabled={!formik?.values?.country}
                error={formik.touched.franchise_type && formik.errors.franchise_type}
            />

            <ImageUploadField
                value={formik.values.image}
                onImageUpload={(url) => {
                    formik.setFieldValue("image", url);
                }}
            />

            <CommonTextField
                label="Enter Video Link"
                placeholder="Video Link"
                name="video"
                value={formik.values.video}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.video && formik.errors.video}
            />

            <Editor
                label="Profile Information"
                value={formik.values.profile}
                onChange={(value) => formik.setFieldValue("profile", value)}
            />

            <Editor
                label="Financials Information"
                value={formik.values.financials}
                onChange={(value) => formik.setFieldValue("financials", value)}
            />
        </>
    );
}
