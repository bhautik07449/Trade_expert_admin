import { Checkbox } from "../../../../components/ui/checkbox";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Label } from "../../../../components/ui/label";
import CountrySelection from "../../../../components/widgets/country_selection";

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
            
            <div className="mt-4">
                <Label className="mb-2 block">Season</Label>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="season-all"
                            checked={formik.values.season === 'All'}
                            onCheckedChange={() => formik.setFieldValue("season", "All")}
                        />
                        <Label htmlFor="season-all">All</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="season-current"
                            checked={formik.values.season === 'Current'}
                            onCheckedChange={() => formik.setFieldValue("season", "Current")}
                        />
                        <Label htmlFor="season-current">Current</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="season-upcoming"
                            checked={formik.values.season === 'Upcoming'}
                            onCheckedChange={() => formik.setFieldValue("season", "Upcoming")}
                        />
                        <Label htmlFor="season-upcoming">Upcoming</Label>
                    </div>
                </div>
            </div>

            <CountrySelection formik={formik}/>
        </div>
    );
}