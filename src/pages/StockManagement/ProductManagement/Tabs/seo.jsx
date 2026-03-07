import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function SEO({ formik }) {
    return (
        <div className="grid grid-cols-1 gap-4 max-w-xl">
            <CommonTextField
                label="Page Title"
                placeholder="Enter Page Title"
                name="pageTitle"
                value={formik.values.pageTitle}
                onChange={formik.handleChange}
                error={formik.touched.pageTitle && formik.errors.pageTitle}
            />

            <CommonTextField
                type="textarea"
                label="Meta Keywords"
                rows={2}
                placeholder="Enter meta keywords (comma separated)"
                name="metaKeywords"
                value={formik.values.metaKeywords}
                onChange={formik.handleChange}
                error={formik.touched.metaKeywords && formik.errors.metaKeywords}
            />

            <CommonTextField
                type="textarea"
                label="Meta Description"
                placeholder="Enter meta description"
                name="metaDescription"
                value={formik.values.metaDescription}
                onChange={formik.handleChange}
                error={formik.touched.metaDescription && formik.errors.metaDescription}
            />
        </div>
    );
}