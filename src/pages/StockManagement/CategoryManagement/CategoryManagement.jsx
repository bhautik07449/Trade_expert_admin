import React, { useState, useCallback, useEffect } from "react";
import { Edit2, Trash2, ChevronDown, ChevronRight, CircleFadingPlus, Package, GripVertical } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Categoriesservice from "../../../service/categories.service";
import Productservice from "../../../service/product.service";
import CustomLoader from "../../../components/widgets/custom_loader";
import { useNavigate } from "react-router";
import { toast } from "../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const levelColors = {
    0: "bg-blue-50 border-blue-300",
    1: "bg-green-50 border-green-300",
    2: "bg-orange-50 border-orange-300",
};

const DraggableRow = ({
    id,
    type,
    title,
    level,
    onEdit,
    onDelete,
    hasChildren,
    expanded,
    toggle,
    onDropHierarchy,
}) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const colorClass = levelColors[level] || "bg-white border-gray-200";

    const handleDragStart = (e) => {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("application/json", JSON.stringify({ type, id }));
        setTimeout(() => e.target.classList.add("opacity-40"), 0);
    };

    const handleDragEnd = (e) => {
        e.stopPropagation();
        e.target.classList.remove("opacity-40");
        setIsDraggingOver(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e) => {
        e.stopPropagation();
        setIsDraggingOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        try {
            const data = JSON.parse(e.dataTransfer.getData("application/json"));

            if (data.type === type && data.id === id) return;

            if (type === 'category' || (type === 'subcategory' && data.type === 'product')) {
                onDropHierarchy(data);
            }
        } catch (err) {
            // ignore
        }
    };

    return (
        <div
            draggable={type === 'subcategory'}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
                flex items-center justify-between rounded-sm border px-3 py-2 my-1 shadow-sm
                transition-all duration-150 select-none
                ${type === 'subcategory' ? "cursor-grab active:cursor-grabbing" : ""}
                ${colorClass}
                ${isDraggingOver ? "ring-2 ring-blue-400 ring-offset-1 scale-[1.01]" : ""}
            `}
            style={{ marginLeft: level * 14 }}
        >
            <div className="flex items-center gap-2">
                {type === 'subcategory' ? (
                    <GripVertical className="w-4 h-4 text-gray-400 shrink-0 cursor-grab" title="Drag to move subcategory" />
                ) : (
                    <div className="w-4 h-4 shrink-0" />
                )}

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

                <span className="text-sm text-gray-800 font-medium">{title}</span>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={onEdit} className="p-1 hover:bg-gray-100 rounded-sm" title="Edit">
                    <Edit2 className="w-4 h-4 text-sky-600" />
                </button>
                <button onClick={onDelete} className="p-1 hover:bg-gray-100 rounded-sm" title="Delete">
                    <Trash2 className="w-4 h-4 text-red-600" />
                </button>
            </div>
        </div>
    );
};

const DraggableProductRow = ({ product, level, onEdit, onDelete }) => {
    const handleDragStart = (e) => {
        e.stopPropagation();
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("application/json", JSON.stringify({ type: 'product', id: product.id }));
        setTimeout(() => e.target.classList.add("opacity-40"), 0);
    };

    const handleDragEnd = (e) => {
        e.stopPropagation();
        e.target.classList.remove("opacity-40");
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`
                flex items-center justify-between rounded-sm border border-gray-100 bg-white
                px-3 py-1.5 my-1 shadow-sm transition-all duration-150
                cursor-grab active:cursor-grabbing select-none hover:shadow-md
            `}
            style={{ marginLeft: level * 14 }}
        >
            <div className="flex items-center gap-2">
                <GripVertical className="w-3.5 h-3.5 text-gray-400 shrink-0" title="Drag to move product" />
                <div className="flex items-center justify-center w-6 h-6 rounded bg-amber-50 text-amber-600">
                    <Package className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-800 font-medium">{product.name}</span>
                    {product.price && (
                        <span className="text-[10px] text-gray-500 font-semibold">${product.price}</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={onEdit} className="p-1 hover:bg-gray-100 rounded-sm" title="Edit Product">
                    <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                </button>
                <button onClick={onDelete} className="p-1 hover:bg-gray-100 rounded-sm" title="Delete Product">
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
            </div>
        </div>
    );
};

const CategoryNode = ({
    node,
    level = 0,
    isTopLevel = false,
    onEdit,
    onDelete,
    onEditProduct,
    onDeleteProduct,
    onHierarchyChange,
}) => {
    const [expanded, setExpanded] = useState(true);
    const subcategories = node.subcategories || [];
    const products = node.products || [];

    const hasSubcategories = subcategories.length > 0;
    const hasProducts = products.length > 0;
    const hasChildren = hasSubcategories || hasProducts;

    const toggle = useCallback(() => setExpanded((prev) => !prev), []);

    const handleDropHierarchy = async (draggedData) => {
        const payload = {};

        if (isTopLevel) {
            payload.categoryId = node.id;
        } else {
            payload.subcategoryId = node.id;
        }

        if (draggedData.type === 'product') {
            payload.productId = draggedData.id;
        } else if (draggedData.type === 'subcategory') {
            payload.subcategoryId = draggedData.id;
            payload.categoryId = node.id;
        }

        onHierarchyChange(payload);
    };

    return (
        <div>
            <DraggableRow
                id={node.id}
                type={isTopLevel ? 'category' : 'subcategory'}
                title={node.name}
                level={level}
                hasChildren={hasChildren}
                expanded={expanded}
                toggle={toggle}
                onEdit={() => onEdit(node)}
                onDelete={() => onDelete(node)}
                onDropHierarchy={handleDropHierarchy}
            />

            {hasChildren && expanded && (
                <div className="space-y-1">
                    {hasSubcategories &&
                        subcategories.map((sub) => (
                            <CategoryNode
                                key={sub.id}
                                node={sub}
                                level={level + 1}
                                isTopLevel={false}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onEditProduct={onEditProduct}
                                onDeleteProduct={onDeleteProduct}
                                onHierarchyChange={onHierarchyChange}
                            />
                        ))}

                    {hasProducts &&
                        products.map((prod) => (
                            <DraggableProductRow
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

const SortableGroup = ({ group, onEdit, onDelete, onEditProduct, onDeleteProduct, onHierarchyChange }) => {
    const cats = group.categories || [];

    return (
        <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm my-4">
            <h3 className="text-md font-bold text-gray-700 border-b pb-2 mb-3 flex items-center justify-between">
                <span>{group.country}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-normal">
                    {cats.length} Categories
                </span>
            </h3>

            {cats.length > 0 ? (
                cats.map((cat) => (
                    <CategoryNode
                        key={cat.id}
                        node={cat}
                        level={0}
                        isTopLevel={true}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onEditProduct={onEditProduct}
                        onDeleteProduct={onDeleteProduct}
                        onHierarchyChange={onHierarchyChange}
                    />
                ))
            ) : (
                <p className="text-sm text-gray-400">No categories for this country</p>
            )}
        </div>
    );
};

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const navigate = useNavigate();

    const getList = async (country) => {
        try {
            setLoading(true);
            const response = await Categoriesservice.getList(country);
            setCategories(response?.data || []);
        } catch (error) {
            toast({
                variant: "error",
                title: "Category Fetch Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getList(selectedCountry);
    }, [selectedCountry]);

    const handleHierarchyChange = async (payload) => {
        try {
            await Categoriesservice.updateHierarchy(payload);
            toast({
                variant: "success",
                title: "Hierarchy Updated",
                description: "Item moved successfully",
            });
            getList(selectedCountry);
        } catch (error) {
            toast({
                variant: "error",
                title: "Hierarchy Update Failed",
                description: error?.response?.data?.message || "Failed to move item",
            });
        }
    };

    const handleEdit = (node) => {
        navigate(`/stock-management/category-management/${node?.id}`);
    };

    const handleDelete = async (nodeToDelete) => {
        try {
            const res = await Categoriesservice.deleteCat(nodeToDelete?.id);
            if (res) {
                getList(selectedCountry);
                toast({
                    variant: "success",
                    title: "Category Deleted Successfully",
                    description: res?.data?.message || "Something went wrong",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Category Deletion Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    };

    const handleEditProduct = (product) => {
        navigate(`/stock-management/category-management/${product.id}`);
    };

    const handleDeleteProduct = async (productToDelete) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the product "${productToDelete.name}"?`
        );
        if (!confirmDelete) return;

        try {
            const res = await Productservice.deleteProduct(productToDelete?.id);
            if (res) {
                getList(selectedCountry);
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Product Deletion Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="h4-bold">Category Management</h2>
                <div className="flex items-center gap-4">
                    <Button
                        className="flex items-center gap-2"
                        onClick={() => navigate("/stock-management/category-management/add")}
                    >
                        <CircleFadingPlus className="size-5" />
                        <span className="max-lg:hidden uppercase"> Add</span>
                    </Button>
                </div>
            </div>

            <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                <GripVertical className="w-3.5 h-3.5" />
                Drag products/subcategories onto a category to move them
            </p>

            {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <CustomLoader size={20} color="currentColor" />
                </div>
            ) : (
                <div className="space-y-4 p-4">
                    {categories.length > 0 ? (
                        categories.map((group) => (
                            <SortableGroup
                                key={group.country}
                                group={group}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onEditProduct={handleEditProduct}
                                onDeleteProduct={handleDeleteProduct}
                                onHierarchyChange={handleHierarchyChange}
                            />
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