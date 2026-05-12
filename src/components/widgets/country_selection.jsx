import { useEffect, useState } from "react";
import PresencesService from "../../service/presences.service"
import CommonBox from "../common/common_box";
import { toast } from "../ui/use-toast";

export default function CountrySelection({ formik }) {
    const [countryOptions, setCountryOptions] = useState([])

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await PresencesService.getCountry();
                if (res?.data?.objects?.countries?.geometries) {
                    const countries = res.data.objects.countries.geometries
                        .map((item) => ({
                            label: item?.properties?.name,
                            value: item?.properties?.name,
                        }))
                        .filter((item) => item.label)
                        .sort((a, b) => a.label.localeCompare(b.label));
                    setCountryOptions(countries);
                }
            } catch (error) {
                console.log(error, "error fetching countries");
                toast({
                    variant: "error",
                    title: "Countries Fetch Failed",
                    description: error?.response?.data?.message || error?.message || "Failed to fetch country list",
                });
            }
        };
        getCountries()
    }, [])

    return (
        <div>
            <CommonBox
                placeholders="Select Country"
                label="Country"
                name="country"
                options={countryOptions}
                value={formik.values.country}
                onChange={(value) => formik.setFieldValue("country", value)}
                error={formik.touched.country && formik.errors.country}
            />
        </div>
    )
}