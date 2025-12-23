import CommonButton from "../../../../components/widgets/common_button";
import CommonBox from "../../../../components/common/common_box";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";

export default function GeneralSetting() {
    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">General Setting</h3>
            </div>
            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="cols-span-6 space-y-5">
                            <CommonTextField
                                label="Site Name"
                                placeholder="Site Name"
                                value={"Sourceseas | Overseas Agri Food Exporter | Agri-produce Broker | Indentor | India"}
                            />
                            <CommonTextField
                                label="Site Admin Email address"
                                placeholder="Site Admin Email address"
                                value={"mgmt.sourceseas@gmail.com"}
                            />
                            <CommonTextField
                                label="Site Career Email address"
                                placeholder="Site Career Email address"
                                value={"mgmt.sourceseas@gmail.com"}
                            />
                            <CommonTextField
                                label="Site Phone number"
                                placeholder="Site Phone number"
                                value={"+91 9925099215"}
                            />
                            <CommonTextField
                                label="Site Mail address"
                                placeholder="Site Mail address"
                                value={"info@sourceseas.com"}
                            />
                            <CommonTextField
                                label="Site Mail Name"
                                placeholder="Site Mail Name"
                                value={"Most Promising Agri-produce - processed food  Indentor & trade facilitators  -Sourceseas&trade;.com"}
                            />
                            <CommonTextField
                                label="Support Email address"
                                placeholder="Support Email address"
                                value={"support@sourceseas.com"}
                            />
                            <CommonTextField
                                label="Certification Title"
                                placeholder="Certification Title"
                                value={"Certification & Membership"}
                            />
                            <CommonTextField
                                label="Video Title"
                                placeholder="Video Title"
                                value={"Our Youtube Channel"}
                            />
                            <CommonTextField
                                label="Home Page Meta Keyword"
                                placeholder="Home Page Meta Keyword"
                                value={"overseas  agri food trade facilitators |  indentors | market developement service providers from india "}
                            />
                            <CommonTextField
                                label="Home Page Meta Description"
                                placeholder="Home Page Meta Description"
                                value={"Promising Overseas  agri food trade facilitators |  indentors | market developement service providers from india "}
                            />
                        </div>
                        <div className="cols-span-6 space-y-5">
                            <CommonBox
                                label="Site Mode"
                                placeholders="Select Site Mode"
                                options={[
                                    { label: "Normal", value: "Normal" },
                                    { label: "Maintenance", value: "Maintenance" },
                                ]}
                                value={"Normal"}
                            />
                            <CommonTextField
                                label="Site Address"
                                placeholder="Site Address"
                                value={"Surat"}
                            />
                            <CommonTextField
                                label="Site State"
                                placeholder="Site State"
                                value={"Gujarat"}
                            />
                            <CommonTextField
                                label="Site Country"
                                placeholder="Site Country"
                                value={"India"}
                            />
                            <CommonTextField
                                label="Map Latitude"
                                placeholder="Map Latitude"
                                value={"21.236706"}
                            />
                            <CommonTextField
                                label="Map Longitude"
                                placeholder="Map Longitude"
                                value={"72.877501"}
                            />
                            <CommonTextField
                                type="textarea"
                                label="Home page Video"
                                placeholder="Home page Video"
                                value={"Surat"}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton type="submit">
                            Save
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div >
    )
}