import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../common/constants";
import { toast } from "../../../../components/ui/use-toast";
import UpcomingCollaborationService from "../../../../service/upcomingcollaboration.service";
import { getImageUrl } from "../../../../utils/imageUtils";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    {
        field: "image", headerName: "Image", flex: 5,
        renderCell: ({ row }) => (
            <img
                src={getImageUrl(row?.image)}
                alt={row?.name}
                className="h-52 w-[500px] object-cover rounded p-0.5"
            />
        )
    },
    { field: "url", headerName: "URL", flex: 1 },
    { field: "country", headerName: "Country", flex: 2 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    { field: "lastUpdatedAt", headerName: "Updated", flex: 1 },
]

export default function UpcomingCollaboration() {
    const [list, setList] = useState([])
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);
    const navigate = useNavigate();

    const getData = async (country) => {
        try {
            const res = await UpcomingCollaborationService.getList(country);
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
                title: "Upcoming Collaboration List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry)
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await UpcomingCollaborationService.deleteUpcomingCollaboration(id)

            if (res) {
                getData(selectedCountry)
                toast({
                    variant: "success",
                    title: "Upcoming Collaboration Deleted",
                    description: res?.data?.message || "Upcoming Collaboration has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete Upcoming Collaboration Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    const handleEdit = (row) => {
        navigate(`/website-management/content/upcoming_collaboration/edit/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Upcoming Collaboration</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/upcoming_collaboration/add')}>
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
                    rowHeight={130}
                />
            </Card>
        </div>
    );
}