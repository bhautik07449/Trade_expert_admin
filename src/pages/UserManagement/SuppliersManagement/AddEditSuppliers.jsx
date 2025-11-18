import CommonDialog from "../../../components/widgets/common_dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import React from "react"
import CommonButton from "../../../components/widgets/common_button"
import CommonDropdown from "../../../components/widgets/common_dropdown"
import { Textarea } from "../../../components/ui/textarea"

const AddEditSuppliers = ({ isOpen, setIsOpen }) => {
    const roles = [
        { label: 'Indenting', value: 'Indenting' },
        { label: 'On-behalf', value: 'On-behalf' },
    ]

    return (
        <CommonDialog
            isOpen={isOpen}
            onClose={() => setIsOpen("")}
            size="xl"
            title="Add Supplier"
            footer={
                <div className="flex gap-2">
                    <CommonButton variant="outline" onClick={() => setIsOpen("")}>
                        cancel
                    </CommonButton>
                    <CommonButton>
                        ADD
                    </CommonButton>
                </div>
            }
        >
            <div className="grid gap-4">

                <form className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 grid gap-4">
                        <div>
                            <Label>First Name</Label>
                            <Input type="text" placeholder="Enter First Name" />
                        </div>
                        <div>
                            <Label>Last Name</Label>
                            <Input type="text" placeholder="Enter Last Name" />
                        </div>
                        <div>
                            <Label>Firm Name</Label>
                            <Input type="text" placeholder="Enter Firm Name" />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input type="text" placeholder="Enter Email" />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input type="text" placeholder="Enter Website" />
                        </div>
                        <div>
                            <Label>Address</Label>
                            <Textarea type="text" placeholder="Enter Address" />
                        </div>
                        <div className="">
                            <Label>Product Status</Label>
                            <CommonDropdown placeholder="Select Product Status" options={roles} />
                        </div>

                    </div>
                    <div className="col-span-12 md:col-span-6 grid gap-4">
                        <div>
                            <Label>City</Label>
                            <Input type="text" placeholder="Enter City" />
                        </div>
                        <div>
                            <Label>State</Label>
                            <Input type="text" placeholder="Enter State" />
                        </div>
                        <div>
                            <Label>Phone No</Label>
                            <Input type="text" placeholder="Enter Phone No" />
                        </div>
                        <div>
                            <Label>Designation</Label>
                            <Input type="text" placeholder="Enter Designation" />
                        </div>
                        <div className="">
                            <Label>Supplier Type</Label>
                            <CommonDropdown placeholder="Select Supplier Type" options={roles} />
                        </div>
                        <div>
                            <Label>Product Category</Label>
                            <Input type="text" placeholder="Enter Product Category" />
                        </div>
                        <div>
                            <Label>Products</Label>
                            <Textarea type="text" placeholder="Enter Products" />
                        </div>
                    </div>
                </form>
            </div>
        </CommonDialog>
    )
}

export default AddEditSuppliers