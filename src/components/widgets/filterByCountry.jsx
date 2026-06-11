import PresencesService from "../../service/presences.service";
import { useEffect, useState } from "react";
import CommonBox from "../common/common_box";

export default function FilterByCountry({ selectedCountry, setSelectedCountry }) {
    const [countryOptions, setCountryOptions] = useState([]);

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
                    setCountryOptions([
                        { label: "All Countries", value: "" },
                        ...countries
                    ]);
                }
            } catch (error) {
                console.log(error, "error fetching countries");
            }
        };
        getCountries();
    }, []);

    return (
        <>
            <CommonBox
                placeholders="Select Country"
                options={countryOptions}
                value={selectedCountry}
                onChange={(value) => setSelectedCountry(value)}
            />
        </>
    )
}