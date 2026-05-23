import { Card } from "../../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import CommonTable from "../../../../components/widgets/common_table";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../../lib/funcation";
import { formatDate } from "../../../../common/constants";
import ContentOverviewservice from "../../../../service/contentoverview.service";
import { toast } from "../../../../components/ui/use-toast";
import FilterByCountry from "../../../../components/widgets/filterByCountry";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
]

export default function ContentOverview() {
    const [list, setList] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("");

    const navigate = useNavigate();

    const getData = async (country) => {
        try {
            const res = await ContentOverviewservice.getList(country)
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    category: item?.category?.name,
                    createdAt: formatDate(item?.lastUpdatedAt),
                }))
                setList(formattedData);
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Content Overview Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry)
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await ContentOverviewservice.deleteContentOverview(id)

            if (res) {
                getData(selectedCountry)
                toast({
                    variant: "success",
                    title: "Content Overview Deleted",
                    description: res?.data?.message || "Content Overview Deleted",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Content Overview Failed",
                description: error?.response?.data?.message || "Content Overview Failed",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/country/content-overview/edit/${row?.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Content Overview</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <FilterByCountry
                            selectedCountry={selectedCountry}
                            setSelectedCountry={setSelectedCountry}
                        />
                    </div>
                    <div onClick={() => navigate("/website-management/country/content-overview/add")}>
                        <Button className="flex items-center gap-2">
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
};