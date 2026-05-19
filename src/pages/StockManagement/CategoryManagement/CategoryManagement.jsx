import React, { useState, useCallback, useEffect } from "react";
import { Edit2, Trash2, ChevronDown, ChevronRight, CircleFadingPlus, Package } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Categoriesservice from "../../../service/categories.service";
import Productservice from "../../../service/product.service";
import CustomLoader from "../../../components/widgets/custom_loader";
import { useNavigate } from "react-router";
import CommonBox from "../../../components/common/common_box";
import PresencesService from "../../../service/presences.service";

const levelColors = {
    0: "bg-blue-50 border-blue-300",
    1: "bg-green-50 border-green-300",
    2: "bg-orange-50 border-orange-300",
};

const Row = ({ title, level, onEdit, onDelete, hasChildren, expanded, toggle }) => {
    return (
        <div
            className={`flex items-center justify-between rounded-sm border px-3 py-2 my-1 shadow-sm ${levelColors[level] || "bg-white"}`}
            style={{ marginLeft: level * 14 }}
        >
            <div className="flex items-center gap-2">
                {hasChildren ? (
                    <button
                        onClick={toggle}
                        className="flex items-center justify-center w-6 h-6 rounded focus:outline-none"
                        aria-label={expanded ? "Collapse" : "Expand"}
                    >
                        {expanded ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </button>
                ) : (
                    <div style={{ width: 24 }} />
                )}

                <span className="text-sm text-gray-800 font-medium">
                    {title}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onEdit}
                    className="p-1 hover:bg-gray-100 rounded-sm"
                    title="Edit"
                >
                    <Edit2 className="w-4 h-4 text-sky-600" />
                </button>

                <button
                    onClick={onDelete}
                    className="p-1 hover:bg-gray-100 rounded-sm"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4 text-red-600" />
                </button>
            </div>
        </div>
    );
};

const ProductRow = ({ product, level, onEdit, onDelete }) => {
    return (
        <div
            className="flex items-center justify-between rounded-sm border border-gray-100 bg-white px-3 py-1.5 my-1 shadow-sm hover:shadow-md transition-all duration-200"
            style={{ marginLeft: level * 14 }}
        >
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-amber-50 text-amber-600 animate-pulse-subtle">
                    <Package className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-800 font-medium">
                        {product.name}
                    </span>
                    {product.price && (
                        <span className="text-[10px] text-gray-500 font-semibold">
                            ${product.price}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onEdit}
                    className="p-1 hover:bg-gray-100 rounded-sm"
                    title="Edit Product"
                >
                    <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                </button>

                <button
                    onClick={onDelete}
                    className="p-1 hover:bg-gray-100 rounded-sm"
                    title="Delete Product"
                >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
            </div>
        </div>
    );
};

const CategoryNode = ({ node, level = 0, onEdit, onDelete, onEditProduct, onDeleteProduct }) => {
    const [expanded, setExpanded] = useState(true);

    const hasSubcategories = Array.isArray(node.subcategories) && node.subcategories.length > 0;
    const hasProducts = Array.isArray(node.products) && node.products.length > 0;
    const hasChildren = hasSubcategories || hasProducts;

    const toggle = useCallback(() => {
        setExpanded((prev) => !prev);
    }, []);

    return (
        <div>
            <Row
                title={node.name}
                level={level}
                hasChildren={hasChildren}
                expanded={expanded}
                toggle={toggle}
                onEdit={() => onEdit(node)}
                onDelete={() => onDelete(node)}
            />

            {hasChildren && expanded && (
                <div className="space-y-1">
                    {hasSubcategories && node.subcategories.map((sub) => (
                        <CategoryNode
                            key={sub.id}
                            node={sub}
                            level={level + 1}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onEditProduct={onEditProduct}
                            onDeleteProduct={onDeleteProduct}
                        />
                    ))}

                    {hasProducts && node.products.map((prod) => (
                        <ProductRow
                            key={prod.id}
                            product={prod}
                            level={level + 1}
                            onEdit={() => onEditProduct(prod)}
                            onDelete={() => onDeleteProduct(prod)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryOptions, setCountryOptions] = useState([]);

    const navigate = useNavigate();

    const getList = async (country) => {
        try {
            setLoading(true);
            const response = await Categoriesservice.getList(country);

            setCategories(response?.data || []);
        } catch (error) {
            console.log("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getList(selectedCountry);
    }, [selectedCountry]);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await PresencesService.getCountry();
                if (res?.data?.objects?.countries?.geometries) {
                    const countries = res.data.objects.countries.geometries
                        .map((item) => ({
                            label: item?.properties?.name,
                            value: item?.properties?.name,
                        }))
                        .filter((item) => item.label)
                        .sort((a, b) => a.label.localeCompare(b.label));
                    setCountryOptions([
                        { label: "All Countries", value: "" },
                        ...countries
                    ]);
                }
            } catch (error) {
                console.log(error, "error fetching countries");
            }
        };
        getCountries();
    }, []);

    const handleEdit = (node) => {
        navigate(`/stock-management/category-management/${node?.id}`)
    };

    const handleDelete = async (nodeToDelete) => {
        try {
            const res = await Categoriesservice.deleteCat(nodeToDelete?.id)
            if (res) {
                getList(selectedCountry)
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleEditProduct = (product) => {
        navigate(`/stock-management/product_management/${product.id}`);
    };

    const handleDeleteProduct = async (productToDelete) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the product "${productToDelete.name}"?`);
        if (!confirmDelete) return;

        try {
            const res = await Productservice.deleteProduct(productToDelete?.id);
            if (res) {
                getList(selectedCountry);
            }
        } catch (error) {
            console.log("error deleting product", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="h4-bold">Category Management</h2>
                <div className="flex items-center gap-4">
                    <div className="w-56">
                        <CommonBox
                            placeholders="Select Country"
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={(value) => setSelectedCountry(value)}
                        />
                    </div>
                    <div>
                        <Button className="flex items-center gap-2" onClick={() => navigate('/stock-management/category-management/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <CustomLoader size={20} color="currentColor" />
                </div>
            ) : (
                <div className="space-y-4 p-4">
                    {categories.length > 0 ? (
                        categories.map((group) => (
                            <div key={group.country} className="border border-gray-200 rounded-md p-4 bg-white shadow-sm my-4">
                                <h3 className="text-md font-bold text-gray-700 border-b pb-2 mb-3 flex items-center justify-between">
                                    <span>{group.country}</span>
                                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-normal">
                                        {group.categories?.length || 0} Categories
                                    </span>
                                </h3>
                                {group.categories && group.categories.length > 0 ? (
                                    group.categories.map((cat) => (
                                        <CategoryNode
                                            key={cat.id}
                                            node={cat}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onEditProduct={handleEditProduct}
                                            onDeleteProduct={handleDeleteProduct}
                                        />
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400">No categories for this country</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center py-6">No categories found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;