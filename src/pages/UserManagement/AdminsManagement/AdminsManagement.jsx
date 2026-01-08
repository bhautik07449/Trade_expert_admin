import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import CommonTable from "../../../components/widgets/common_table";
import { formatDate } from "../../../common/constants";
import { useNavigate } from "react-router";
import CustomLoader from "../../../components/widgets/custom_loader";
import Adminservice from "../../../service/admin.service";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "firstName", headerName: "FirstName", flex: 1 },
    { field: "lastName", headerName: "LastName", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "phone", headerName: "PhoneNo", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

const AdminsManagement = () => {
    const [search, setSearch] = useState("");
    const [user, setUserList] = useState([]);
    const [loder, setLoder] = useState(false);
    console.log("search", search);

    const navigate = useNavigate();

    const getUserData = async () => {
        setLoder(true);
        try {
            const res = await Adminservice.getAdmin();
            if (res) {
                const formattedData = res?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item.createdAt),
                }))
                setUserList(formattedData);
                setLoder(false);
            }

        } catch (error) {
            console.log(error, "error");
        } finally {
            setLoder(false);
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    const handleEdit = (row) => {
        navigate(`/user-management/admins-management/edit/${row?.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Admins Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Admins"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Button className="flex items-center gap-2"
                            onClick={() => navigate('/user-management/admins-management/add')}
                        >
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>
                {loder ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CustomLoader size={20} color="currentColor" />
                    </div>
                ) :
                    <CommonTable
                        columns={columns}
                        rows={user || []}
                        showEdit={true}
                        showDelete={true}
                        onEdit={(row) => { handleEdit(row) }}
                        onDelete={() => { }}
                    />
                }
            </Card>
        </div>
    );
}


export default AdminsManagement;