import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}

function EditItem() {
  const [items, setItems] = useLocalStorage<Item[]>("items", []);
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const id = router.query.id as string;
    if (id) {
      const item = items.find((item) => item.id === id);
      if (item) {
        setName(item.name);
        setDescription(item.description);
      }
    }
  }, [router.query.id, items]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (name) params.set("name", name || "");
    if (description) params.set("description", description || "");
    router.push(`?${params.toString()}`);
  }, [name, description, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      alert("Please fill in all fields");
      return;
    }
    setItems([...items, { id: Date.now().toString(), name, description }]);
    alert("Item added successfully");
    setName("");
    setDescription("");
    // router.push("/crud");
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
        Edit
      </button>
    </form>
  );
}

export default EditItem;
