import CommonBox from "../../../../../components/common/common_box";
import { CommonTextField } from "../../../../../components/widgets/common_textField";

export default function ReadyStock({ formik, categoryOptions, subCategoryOptions, productOptions }) {
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
                label="Sub Category"
                placeholders="Select Sub Category"
                options={subCategoryOptions}
                name="subCategory"
                value={formik.values.subCategory}
                onChange={(value) => {
                    formik.setFieldValue("subCategory", value);
                    formik.setFieldValue("product", "");
                }}
                error={formik.touched.subCategory && formik.errors.subCategory}
            />
            <CommonBox
                label="Product"
                placeholders="Select Product"
                options={productOptions}
                name="product"
                value={formik.values.product}
                onChange={(value) => formik.setFieldValue("product", value)}
                error={formik.touched.product && formik.errors.product}
            />
            <CommonTextField
                label="Hsncode"
                placeholder="Hsncode"
                name="hsncode"
                value={formik.values.hsncode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <CommonTextField
                label="Quantity"
                placeholder="Quantity"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <CommonTextField
                label="Unit Measurement"
                placeholder="Unit Measurement"
                name="unit_measurement"
                value={formik.values.unit_measurement}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <CommonTextField
                label="Packing Configure"
                placeholder="Packing Configure"
                name="packing_configure"
                value={formik.values.packing_configure}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <CommonTextField
                label="Actual Price"
                placeholder="Actual Price"
                name="actual_price"
                value={formik.values.actual_price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <CommonTextField
                label="Discounted Price"
                placeholder="Discounted Price"
                name="discounted_price"
                value={formik.values.discounted_price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
        </>
    )
}