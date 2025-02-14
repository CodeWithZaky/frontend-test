import { useState } from "react";
import ItemForm from "./item-form";

interface Item {
  id: string;
  name: string;
  description: string;
}

interface ItemListProps {
  items: Item[];
  onUpdate: (item: Item) => void;
  onDelete: (id: string) => void;
}

export default function ItemList({ items, onUpdate, onDelete }: ItemListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="mb-2 p-4 border dark:border-white border-black rounded"
        >
          {editingId === item.id ? (
            <ItemForm
              initialData={item}
              onSubmit={(updatedItem) => {
                onUpdate(updatedItem);
                setEditingId(null);
              }}
            />
          ) : (
            <>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">
                {item.name}
              </h3>
              <p className="text-stone-900 dark:text-stone-100">
                {item.description}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setEditingId(item.id)}
                  className="bg-blue-500 mr-2 px-2 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-500 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
