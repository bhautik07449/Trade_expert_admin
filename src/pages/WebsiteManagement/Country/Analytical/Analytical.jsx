import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../../components/widgets/common_table";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../common/constants";
import AnalyticalService from "../../../../service/analytical.service";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "value", headerName: "Value", flex: 2 },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function Analytical() {
    const [list, setList] = useState([])
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    console.log("search", search);

    const getList = async () => {
        try {
            const res = await AnalyticalService.getList()
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    country: item?.country || "-",
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData)
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getList()
    }, [])

    const handledelete = async (id) => {
        try {
            const res = await AnalyticalService.deleteAnalytical(id)
            if (res) {
                getList()
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/country/analytical/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Analytical Dashboard</h3>
                <h4 className="h6-bold">Total: {list.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/country/analytical/add')}>
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
                    onDelete={handledelete}
                />
            </Card>
        </div>
    );
}