import React, { useState, useCallback, useEffect } from "react";
import { Edit2, Trash2, ChevronDown, ChevronRight, CircleFadingPlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Categoriesservice from "../../../service/categories.service";
import CustomLoader from "../../../components/widgets/custom_loader";
import { useNavigate } from "react-router";

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

const CategoryNode = ({ node, level = 0, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(true);

    const hasChildren =
        Array.isArray(node.children) && node.children.length > 0;

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
                <div>
                    {node.children.map((child) => (
                        <CategoryNode
                            key={child.id}
                            node={child}
                            level={level + 1}
                            onEdit={onEdit}
                            onDelete={onDelete}
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

    const navigate = useNavigate();

    const getList = async () => {
        try {
            setLoading(true);
            const response = await Categoriesservice.getList();

            setCategories(response?.data || []);
        } catch (error) {
            console.log("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    const handleEdit = (node) => {
        navigate(`/stock-management/category-management/${node?.id}`)
    };

    const handleDelete = async (nodeToDelete) => {
        try {
            const res = await Categoriesservice.deleteCat(nodeToDelete?.id)
            if (res) {
                getList()
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="h4-bold mb-4">Category Management</h2>
                <div>
                    <Button className="flex items-center gap-2" onClick={() => navigate('/stock-management/category-management/add')}>
                        <CircleFadingPlus className="size-5" />
                        <span className="max-lg:hidden uppercase"> Add</span>
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <CustomLoader size={20} color="currentColor" />
                </div>
            ) : (
                <div className="space-y-2 p-4">
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <CategoryNode
                                key={cat.id}
                                node={cat}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400">No categories found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;