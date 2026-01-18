import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { data } from "./data";
import { useNavigate } from "react-router";

export default function ExportInvoice() {
    const invoice = data();
    const navigate = useNavigate()

    return (
        <Card className="p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-20">Sr. No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center w-24">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {invoice.map((section, sectionIndex) => (
                        <>
                            <TableRow
                                key={`section-${sectionIndex}`}
                                className="bg-muted font-semibold"
                            >
                                <TableCell colSpan={3}>
                                    {section.title}
                                </TableCell>
                            </TableRow>

                            {section.items.map((item, itemIndex) => (
                                <TableRow key={itemIndex}>
                                    <TableCell>
                                        {itemIndex + 1}
                                    </TableCell>
                                    <TableCell>
                                        {item.label}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => navigate(`/documents/export-invoice/${item?.slug}`)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}