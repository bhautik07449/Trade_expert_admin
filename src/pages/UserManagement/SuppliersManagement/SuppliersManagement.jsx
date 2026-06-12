import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import CommonTable from "../../../components/widgets/common_table";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../lib/funcation";
import Supplierservice from "../../../service/suppliers.service";
import { formatDate } from "../../../common/constants";
import { toast } from "../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "company_name", headerName: "Company Name", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "phone", headerName: "PhoneNo", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "service_type", headerName: "Service Type", flex: 3 },
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
    const [list, setList] = useState([])
    const [loder, setLoder] = useState(false);
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const navigate = useNavigate();

    const getList = async (country) => {
        setLoder(true);
        try {
            const res = await Supplierservice.getList(country);
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
            toast({
                variant: "error",
                title: "Supplier",
                description: error?.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoder(false);
        }
    }

    useEffect(() => {
        getList(selectedCountry)
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await Supplierservice.deleteSupplier(id)
            if (res) {
                getList(selectedCountry)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Supplier",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/user-management/scm/suppliers/${row?.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Suppliers Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div>
                        <Button className="flex items-center gap-2" onClick={() => navigate('/user-management/scm/suppliers/add')}>
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