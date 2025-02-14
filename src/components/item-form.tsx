import { useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}

interface ItemFormProps {
  initialData?: Item;
  onSubmit: (item: Item) => void;
}

export default function ItemForm({ initialData, onSubmit }: ItemFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id || Date.now().toString(),
      name,
      description,
    });
    if (!initialData) {
      setName("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item description"
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="bg-green-500 px-4 py-2 rounded text-white"
      >
        {initialData ? "Update" : "Add"} Item
      </button>
    </form>
  );
}
