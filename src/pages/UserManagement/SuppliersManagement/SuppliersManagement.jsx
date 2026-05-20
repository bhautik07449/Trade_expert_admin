import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import CommonTable from "../../../components/widgets/common_table";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../lib/funcation";
import Supplierservice from "../../../service/suppliers.service";
import { formatDate } from "../../../common/constants";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "phone", headerName: "PhoneNo", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 1 },
]
const SuppliersManagement = () => {

    const [search, setSearch] = useState("");
    const [list, setList] = useState([])
    const [loder, setLoder] = useState(false);
    const navigate = useNavigate();
    console.log("search", list);

    const getList = async () => {
        setLoder(true);
        try {
            const res = await Supplierservice.getList();
            if (res) {
                const formattedData = res?.data?.map((item, index) => ({
                    ...item,
                    name: item?.firstName + " " + item?.lastName,
                    SrNo: index + 1,
                    createdAt: formatDate(item.createdAt),
                }))
                setList(formattedData);
                setLoder(false);
            }

        } catch (error) {
            console.log(error, "error");
        } finally {
            setLoder(false);
        }
    }

    useEffect(() => {
        getList()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await Supplierservice.deleteSupplier(id)
            if (res) {
                getList()
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleEdit = (row) => {
        navigate(`/user-management/suppliers-management/${row?.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Suppliers Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Suppliers"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Button className="flex items-center gap-2" onClick={() => navigate('/user-management/suppliers-management/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>
                <CommonTable
                    columns={columns}
                    rows={list || []}
                    loading={loder}
                    showEdit={true}
                    showDelete={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
}

export default SuppliersManagement;