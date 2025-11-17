import CommonDialog from "../../../components/widgets/common_dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import React from "react"
import CommonButton from "../../../components/widgets/common_button"

const AddEditAdmin = ({ isOpen, setIsOpen }) => {
    return (
        <CommonDialog
            isOpen={isOpen}
            onClose={() => setIsOpen("")}
            size="xl"
            title="Create Admin"
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
                            <Label>Email</Label>
                            <Input type="text" placeholder="Enter Email" />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 grid gap-4">
                        <div>
                            <Label>Phone No</Label>
                            <Input type="text" placeholder="Enter Phone No" />
                        </div>
                        <div>
                            <Label>Password</Label>
                            <Input type="text" placeholder="Enter Password" />
                        </div>
                        <div>
                            <Label>Image</Label>
                        </div>
                    </div>
                </form>
            </div>
        </CommonDialog>
    )
}

export default AddEditAdmin