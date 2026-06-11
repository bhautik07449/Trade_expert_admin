import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { useEffect, useState } from "react";
import CommonFiltter from "../../../../components/widgets/common_filter";
import Emailtemplateservice from "../../../../service/newsletter.service";
import { formatDate } from "../../../../common/constants";
import Newsletterservice from "../../../../service/newsletter.service";
import { toast } from "../../../../components/ui/use-toast";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "email", headerName: "Email", flex: 6 },
    { field: "Subscribe_Date", headerName: "Subscribe_Date", flex: 2 },
    { field: "Unsubscribe_Date", headerName: "Unsubscribe_Date", flex: 2 }
]

export default function NewsletterManagement() {
    const [list, setList] = useState([])

    const getData = async () => {
        try {
            const res = await Newsletterservice.getList();
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    Subscribe_Date: formatDate(item?.createdAt),
                    Unsubscribe_Date: formatDate(item?.createdAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Newsletter Management",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const filterData = [
        { type: "text", placeholder: "Name", label: "Name" },
        { type: "text", placeholder: "Rate", label: "Rate" },
    ]

    const handleApplyFilters = (filters) => {
        console.log("Applied Filters:", filters);
    }

    const handleClearFilters = () => {
        console.log("Filters Cleared");
    }

    const handleDelete = async (id) => {
        try {
            const res = await Emailtemplateservice.deleteNewsletter(id)

            if (res) {
                getData()
                toast({
                    variant: "success",
                    title: "Newsletter Management",
                    description: res?.data?.message || "Newsletter deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Newsletter Management",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Newsletter Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <CommonFiltter
                            filterData={filterData}
                            onApplyFilters={handleApplyFilters}
                            onClearFilters={handleClearFilters}
                        />
                    </div>
                </div>

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