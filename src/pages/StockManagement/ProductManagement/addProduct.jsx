import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";

export default function AddProduct() {
    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Product</h3>
            </div>
            <Card className="p-6">

            </Card>
        </div>
    );
}