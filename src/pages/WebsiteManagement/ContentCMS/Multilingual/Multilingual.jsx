import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../common/constants";
import { toast } from "../../../../components/ui/use-toast";
import Multilingualservice from "../../../../service/multilingual.service";
import FilterByCountry from "../../../../components/widgets/filterByCountry";
import { getImageUrl } from "../../../../utils/imageUtils";
import { getStatusStyles } from "../../../../lib/funcation";

const columns = [
    { field: "SrNo", headerName: "SrNo" },
    {
        field: "image", headerName: "Image",
        renderCell: ({ row }) => (
            <img
                src={getImageUrl(row?.image)}
                alt={row?.name}
                className="h-52 w-[500px] object-cover rounded p-0.5"
            />
        )
    },
    { field: "country", headerName: "Country" },
    { field: "title", headerName: "Titile" },
    { field: "description", headerName: "Description" },
    {
        field: "status", headerName: "Status", renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created" },
]

export default function Multilingual() {
    const [list, setList] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("")
    const navigate = useNavigate();

    const getData = async (country) => {
        try {
            const res = await Multilingualservice.getList(country);
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
                title: "Multilingual List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry)
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await Multilingualservice.deleteMultilingual(id)

            if (res) {
                getData()
                toast({
                    variant: "success",
                    title: "Multilingual Deleted",
                    description: res?.data?.message || "Multilingual has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete Multilingual Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    const handleEdit = (row) => {
        navigate(`/website-management/content/multilingual/edit/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Multilingual</h3>
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

                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/multilingual/add')}>
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
                    rowHeight={100}
                />
            </Card>
        </div>
    );
}