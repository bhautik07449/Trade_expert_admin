import React, { useState, useCallback } from "react";
import { Edit2, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";

const initialCategories = [
    {
        id: "cat-1",
        title: "Agri & Foods",
        children: [
            {
                id: "sub-1",
                title: "Fresh Produces",
                children: [
                    { id: "item-1", title: "Fresh Red Onion" },
                    { id: "item-2", title: "Promogranate" },
                    { id: "item-3", title: "Cavendish Banana" },
                    { id: "item-4", title: "Fresh Tomato" },
                ],
            },
            {
                id: "sub-2",
                title: "Grains & Pulses",
                children: [{ id: "item-5", title: "1121-Basmati Rice" }, { id: "item-6", title: "Peanuts" }],
            },
            {
                id: "sub-3",
                title: "Dehydrated",
                children: [
                    { id: "item-7", title: "White Onion flakes" },
                    { id: "item-8", title: "White Onion Powder" },
                ],
            },
        ],
    },
    { id: "cat-2", title: "Electronics", children: [{ id: "sub-4", title: "Wired Electronics" }] },
];

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
                        {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                ) : (
                    <div style={{ width: 24 }} />
                )}

                <span className="text-sm text-gray-800">{title}</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onEdit}
                    className="p-1 hover:bg-gray-100 rounded-sm"
                    title="Edit"
                    aria-label={`Edit ${title}`}
                >
                    <Edit2 className="w-4 h-4 text-sky-600" />
                </button>

                <button
                    onClick={onDelete}
                    className="p-1 hover:bg-gray-100 rounded-sm"
                    title="Delete"
                    aria-label={`Delete ${title}`}
                >
                    <Trash2 className="w-4 h-4 text-red-600" />
                </button>
            </div>
        </div>
    );
};

const CategoryNode = ({ node, level = 0, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(true);
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;

    const toggle = useCallback(() => setExpanded((s) => !s), []);

    return (
        <div>
            <Row
                title={node.title}
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
                        <CategoryNode key={child.id} node={child} level={level + 1} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

const CategoryManagement = () => {
    const [categories, setCategories] = useState(initialCategories);

    const handleEdit = (node) => {
        console.log("Edit", node);
    };

    const handleDelete = (nodeToDelete) => {
        const deleteRec = (items) =>
            items
                .map((it) => {
                    if (it.id === nodeToDelete.id) return null;
                    if (it.children) {
                        const newChildren = deleteRec(it.children).filter(Boolean);
                        return { ...it, children: newChildren };
                    }
                    return it;
                })
                .filter(Boolean);

        setCategories((prev) => deleteRec(prev));
    };

    const handleUpdate = () => {
        console.log("Update categories payload:", categories);
    };

    return (
        <div className="">
            <h2 className="h4-bold">Category Management</h2>

            <div className="space-y-2 p-4">
                {categories.map((cat) => (
                    <CategoryNode key={cat.id} node={cat} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>

            <div className="mt-6">
                <Button onClick={handleUpdate} className="bg-sky-600 hover:bg-sky-700">
                    Update
                </Button>
            </div>
        </div>
    );
};

export default CategoryManagement;