import { useEffect, useMemo, useState } from "react";
import Tradetypeservice from "../../../../service/tradetype.service";
import CommonBox from "../../../../components/common/common_box";

export default function OfferCheck({ formik }) {
    const [list, setList] = useState([]);

    const getData = async () => {
        try {
            const res = await Tradetypeservice.getList();

            if (res) {
                setList(res?.data?.data || []);
            }
        } catch (error) {
            console.log(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const offerTypeOptions = useMemo(() => {
        return list.map((item) => ({
            label: item.name,
            value: item.id,
        }));
    }, [list]);

    return (
        <div className="grid grid-cols-2 gap-4">
            <CommonBox
                label="Offer Type"
                placeholders="Select Offer Type"
                options={offerTypeOptions}
                name="offer_type"
                value={formik.values.offer_type}
                onChange={(value) => formik.setFieldValue("offer_type", value)}
                error={formik.touched.offer_type && formik.errors.offer_type}
            />
        </div>
    );
}