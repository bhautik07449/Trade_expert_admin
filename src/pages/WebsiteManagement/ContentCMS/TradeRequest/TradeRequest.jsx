import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../../components/widgets/common_table";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../common/constants";
import { toast } from "../../../../components/ui/use-toast";
import { useSelector } from "react-redux";
import RequestInfoService from "../../../../service/requestInfo.service";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 4 },
    { field: "country", headerName: "Country", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "street", headerName: "Street", flex: 1 },
    { field: "unit", headerName: "Unit", flex: 1 },
    { field: "postal", headerName: "Postal Code", flex: 1 },
    { field: "available_cash", headerName: "Available Cash", flex: 1 },
    { field: "contact_method", headerName: "Contact Method", flex: 1 },
    { field: "contact_detail", headerName: "Contact Detail", flex: 1 },
    { field: "investment_diligence", headerName: "Investment Diligence", flex: 1 },
    { field: "best_time_to_call", headerName: "Best Time to Call", flex: 1 },
    { field: "comment", headerName: "Comment", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    { field: "lastUpdatedAt", headerName: "Updated", flex: 1 },
]

export default function TradeRequest() {
    const [list, setList] = useState([])
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const getData = async (country) => {
        try {
            const res = await RequestInfoService.getList(country);
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    name: item?.first_name + " " + item?.last_name || "N/A",
                    lastUpdatedAt: formatDate(item?.lastUpdatedAt),
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Request Info List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry)
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await RequestInfoService.deleteRequestInfo(id)

            if (res) {
                getData(selectedCountry)
                toast({
                    variant: "success",
                    title: "Request Info Deleted",
                    description: res?.data?.message || "Request Info has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete Request Info Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Request Info</h3>
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