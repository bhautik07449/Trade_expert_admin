import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CommonTextField } from "../../../..//components/widgets/common_textField";
// import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import CommonFiltter from "../../../../components/widgets/common_filter";
import Emailtemplateservice from "../../../../service/newsletter.service";
import { formatDate } from "../../../../common/constants";
import Newsletterservice from "../../../../service/newsletter.service";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "email", headerName: "Email", flex: 6 },
    { field: "Subscribe_Date", headerName: "Subscribe_Date", flex: 2 },
    { field: "Unsubscribe_Date", headerName: "Unsubscribe_Date", flex: 2 }
]

export default function NewsletterManagement() {

    const [list, setList] = useState([])
    const [search, setSearch] = useState("");
    console.log("search", search);

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
            console.log(error, "error");
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
            }
        } catch (error) {
            console.log("error", error);
        }

    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Newsletter Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Email"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        {/* <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/currency/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button> */}
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