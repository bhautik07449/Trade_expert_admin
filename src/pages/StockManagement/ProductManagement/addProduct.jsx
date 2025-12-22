import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import BasicInfo from "./Tabs/basic_info";
import SEO from "./Tabs/seo";
import Image from "./Tabs/image";
import Details from "./Tabs/details";

export default function AddProduct() {
    return (
        <div className="grid gap-6">
            <div className="flex justify-between items-center gap-4">
                <h3 className="h5-bold">Add Product</h3>
                <BackPath />
            </div>
            <Card className="p-6">
                <Tabs defaultValue="basic_info">
                    <TabsList>
                        <TabsTrigger value="basic_info">Basic Info</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="image">Image</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic_info">
                        <BasicInfo />
                    </TabsContent>
                    <TabsContent value="seo">
                        <SEO />
                    </TabsContent>
                    <TabsContent value="image">
                        <Image />
                    </TabsContent>
                    <TabsContent value="details">
                        <Details />
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
}