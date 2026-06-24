import React, { useEffect, useState } from "react";
import MultiSelectBox from "../../../../components/common/MultiSelectBox";
import FinancialServiceservice from "../../../../service/finacialservice.service";

export default function IR({ formik }) {
    const [financialOptions, setFinancialOptions] = useState([]);

    useEffect(() => {
        const fetchFinancialData = async () => {
            if (!formik.values.country) {
                setFinancialOptions([]);
                return;
            }
            try {
                const res = await FinancialServiceservice.getList(formik.values.country);
                if (res && res.data && res.data.data) {
                    const options = res.data.data.map(item => ({
                        label: item.name || item.title || item.id,
                        value: item.id
                    }));
                    setFinancialOptions(options);
                }
            } catch (error) {
                console.error("Failed to fetch financial data:", error);
            }
        };

        fetchFinancialData();
    }, [formik.values.country]);

    return (
        <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultiSelectBox
                    label="Finacial Service"
                    placeholders="Select Finacial Service"
                    options={financialOptions}
                    name="finacial_service"
                    value={formik.values.finacial_service || []}
                    onChange={(value) => formik.setFieldValue("finacial_service", value)}
                    error={formik.touched.finacial_service && formik.errors.finacial_service}
                />
            </div>
        </div>
    );
}
