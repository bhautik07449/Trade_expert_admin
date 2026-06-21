import React, { useRef, useState, useEffect } from "react";
import * as xlsx from "xlsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { toast } from "../../../components/ui/use-toast";
import Productservice from "../../../service/product.service";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/slice/categoriesSlice";
import { fetchFlatMeasurement } from "../../../store/slice/measurementSlice";

const ProductExcelUpload = ({ open, onOpenChange, onSuccess }) => {
    const [fileData, setFileData] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    const { flatList: measurements } = useSelector((state) => state.measurements);

    useEffect(() => {
        if (open) {
            dispatch(fetchCategories());
            dispatch(fetchFlatMeasurement());
        }
    }, [open, dispatch]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Flatten categories for searching
        const allCategories = [];
        const collectCategories = (cats) => {
            if (!cats) return;
            cats.forEach(c => {
                allCategories.push(c);
                if (c.children) collectCategories(c.children);
            });
        };
        collectCategories(categories);

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = xlsx.read(bstr, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws);
                
                // Validate data
                const validatedData = data.map((row) => {
                    const subcat = row.subCategory || row.subcategory;
                    let reasons = [];
                    
                    if (!row.name) reasons.push("Missing name");
                    if (!row.price) reasons.push("Missing price");
                    
                    if (!row.category) reasons.push("Missing category");
                    else if (!allCategories.some(c => String(c.name).toLowerCase() === String(row.category).toLowerCase() || c.id === Number(row.category))) {
                        reasons.push(`Category '${row.category}' not found`);
                    }

                    if (!subcat) reasons.push("Missing subcategory");
                    else if (!allCategories.some(c => String(c.name).toLowerCase() === String(subcat).toLowerCase() || c.id === Number(subcat))) {
                        reasons.push(`Subcategory '${subcat}' not found`);
                    }

                    if (!row.measure) reasons.push("Missing measure");
                    else if (!measurements.some(m => String(m.name).toLowerCase() === String(row.measure).toLowerCase() || m.id === Number(row.measure))) {
                        reasons.push(`Measure '${row.measure}' not found`);
                    }

                    const isValid = reasons.length === 0;
                    return {
                        ...row,
                        isValid: !!isValid,
                        reason: isValid ? "" : reasons.join(" | ")
                    };
                });
                
                setFileData(validatedData);
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Error parsing Excel",
                    description: "Invalid file format",
                });
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const submitValidRows = async () => {
        if (!fileData) return;
        const validRows = fileData.filter(r => r.isValid);
        if (validRows.length === 0) {
            toast({
                variant: "error",
                title: "No valid rows",
                description: "There are no valid entries to upload.",
            });
            return;
        }

        setIsUploading(true);

        try {
            const payloads = validRows.map(row => ({
                name: row.name,
                price: row.price,
                category: row.category, 
                subCategory: row.subCategory || row.subcategory,
                measure: row.measure,
                teriff: row.teriff || "",
                slug: row.slug || row.name?.toLowerCase().replace(/\s+/g, '-'),
                pageTitle: row.pageTitle || row.name,
                metaKeywords: row.metaKeywords || "",
                metaDescription: row.metaDescription || "",
                seasonalChart: row.seasonalChart || "",
                description: row.description || "",
                newArrival: true,
                status: "Composite",
                offer_type: row.offer_type || "",
                country: row.country || ""
            }));
            
            const res = await Productservice.addProduct(payloads);
            
            if (res?.data?.errors && res.data.errors.length > 0) {
                // Some failed. Update fileData to show the backend errors.
                const newFileData = [...fileData];
                // we need to map back the validRows errors to the original fileData
                let validRowIndex = 0;
                for (let i = 0; i < newFileData.length; i++) {
                    if (newFileData[i].isValid) {
                        const errorForThisRow = res.data.errors.find(e => e.index === validRowIndex);
                        if (errorForThisRow) {
                            newFileData[i].isValid = false;
                            newFileData[i].reason = "Backend Error: " + errorForThisRow.reason;
                        }
                        validRowIndex++;
                    }
                }
                
                setFileData(newFileData);
                toast({
                    variant: "error",
                    title: "Partial Upload",
                    description: res?.data?.message || "Some products failed to upload. Check the red entries.",
                });
                onSuccess(); // Still refresh list for the ones that succeeded
            } else {
                toast({
                    variant: "success",
                    title: "Upload Complete",
                    description: res?.data?.message || `Successfully added products.`,
                });
                
                onSuccess();
                onOpenChange(false);
                setFileData(null);
            }
        } catch (err) {
            console.error("Failed to add products:", err);
            toast({
                variant: "error",
                title: "Upload Failed",
                description: err?.response?.data?.message || "Failed to upload products in bulk.",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const resetDialog = () => {
        setFileData(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <Dialog open={open} onOpenChange={(val) => {
            if (!val) resetDialog();
            onOpenChange(val);
        }}>
            <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Upload Products via Excel</DialogTitle>
                </DialogHeader>
                
                <div className="flex-1 overflow-auto py-4">
                    {!fileData ? (
                        <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg">
                            <input 
                                type="file" 
                                accept=".xlsx, .xls, .csv" 
                                onChange={handleFileUpload} 
                                ref={fileInputRef}
                                className="hidden" 
                            />
                            <p className="mb-4 text-sm text-gray-500">Upload an excel file containing product details.</p>
                            <Button onClick={handleUploadClick}>Select File</Button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            <div className="flex justify-between items-center">
                                <h4 className="text-sm font-medium">Preview</h4>
                                <Button variant="outline" size="sm" onClick={() => setFileData(null)}>Choose Another File</Button>
                            </div>
                            <div className="border rounded-md overflow-auto max-h-[50vh]">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 sticky top-0">
                                        <tr>
                                            <th className="p-2 border-b">Status</th>
                                            <th className="p-2 border-b">Name</th>
                                            <th className="p-2 border-b">Price</th>
                                            <th className="p-2 border-b">Category</th>
                                            <th className="p-2 border-b">Country</th>
                                            <th className="p-2 border-b">Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fileData.map((row, idx) => (
                                            <tr key={idx} className={row.isValid ? "bg-green-50" : "bg-red-50"}>
                                                <td className="p-2 border-b">
                                                    {row.isValid ? (
                                                        <span className="text-green-600 font-medium">Valid</span>
                                                    ) : (
                                                        <span className="text-red-600 font-medium">Invalid</span>
                                                    )}
                                                </td>
                                                <td className="p-2 border-b">{row.name || "-"}</td>
                                                <td className="p-2 border-b">{row.price || "-"}</td>
                                                <td className="p-2 border-b">{row.category || "-"}</td>
                                                <td className="p-2 border-b">{row.country || "-"}</td>
                                                <td className="p-2 border-b text-xs text-gray-500">{row.reason || "Ready to add"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
                
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    {fileData && (
                        <Button 
                            onClick={submitValidRows} 
                            disabled={isUploading || !fileData.some(r => r.isValid)}
                        >
                            {isUploading ? "Uploading..." : `Upload Valid Products (${fileData.filter(r => r.isValid).length})`}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProductExcelUpload;
