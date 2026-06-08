import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../common/constants";
import CountryProductService from "../../../../service/countryproduct.service";
import { toast } from "../../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 4 },
    { field: "country", headerName: "Country", flex: 4 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    { field: "lastUpdatedAt", headerName: "Updated", flex: 1 },
]

export default function ProductName() {
    const [list, setList] = useState([])
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);
    const navigate = useNavigate();

    const getData = async (country) => {
        try {
            const res = await CountryProductService.getProductName(country);
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    lastUpdatedAt: formatDate(item?.lastUpdatedAt),
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Product Name Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry)
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await CountryProductService.deleteProductName(id)

            if (res) {
                getData(selectedCountry)
                toast({
                    variant: "success",
                    title: "Product Name Deleted",
                    description: res?.data?.message || "Product Name deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Product Name Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    const handleEdit = (row) => {
        navigate(`/website-management/country/product-name/edit/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Product Name</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/country/product-name/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>

                <CommonTable
                    columns={columns}
                    rows={list || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
}