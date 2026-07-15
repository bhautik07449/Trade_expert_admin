import { Card } from "../../../components/ui/card";
import CommonTable from "../../../components/widgets/common_table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../common/constants";
import { toast } from "../../../components/ui/use-toast";
import { useSelector } from "react-redux";
import Investorservice from "../../../service/investors.service";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 4 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "company_name", headerName: "Company Name", flex: 2 },
    { field: "address", headerName: "Address", flex: 2 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "country", headerName: "Country", flex: 2 },
    { field: "website", headerName: "Website", flex: 2 },
    { field: "service_type", headerName: "Service Type", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    { field: "lastUpdatedAt", headerName: "Updated", flex: 1 },
]

export default function Investors() {
    const [list, setList] = useState([])
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const getData = async (country) => {
        try {
            const res = await Investorservice.getList(country);
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    name: item?.firstName + " " + item?.lastName || "N/A",
                    lastUpdatedAt: formatDate(item?.lastUpdatedAt),
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Trade Diversity Type List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry)
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await Investorservice.deleteInvestor(id)

            if (res) {
                getData(selectedCountry)
                toast({
                    variant: "success",
                    title: "Investor Deleted",
                    description: res?.data?.message || "Investor has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete Investor Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Investors</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <CommonTable
                    columns={columns}
                    rows={list || []}
                    showDelete={true}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
}