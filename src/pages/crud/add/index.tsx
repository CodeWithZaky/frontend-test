import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}

export default function AddItemPage() {
  const [items, setItems] = useLocalStorage<Item[]>("items", []);
  const router = useRouter();
  const queryParams = router.query;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const nameParam = queryParams.name;
      const descriptionParam = queryParams.description;

      if (nameParam) setName(nameParam as string);
      if (descriptionParam) setDescription(descriptionParam as string);
    }
  }, [router.isReady, queryParams]);

  const AddItem = (e: React.FormEvent) => {
    e.preventDefault();
    setItems([...items, { id: Date.now().toString(), name, description }]);
    router.push("/crud");
  };

  // Fungsi untuk memperbarui URL saat state berubah
  const updateQueryString = (name: string, description: string) => {
    const currentParams = new URLSearchParams();
    if (name) currentParams.set("name", name);
    if (description) currentParams.set("description", description);
    router.replace(`/crud/add?${currentParams.toString()}`, undefined, {
      shallow: true,
    });
    // router.push(`/crud/add?${currentParams.toString()}`);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    updateQueryString(newName, description);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    updateQueryString(name, newDescription);
  };

  return (
    <div className="mx-auto p-4 container">
      <h1 className="mb-4 font-bold text-2xl">Add Item</h1>
      <form onSubmit={AddItem} className="mb-4">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Item name"
          required
          className="bg-stone-900 mb-2 p-2 border rounded w-full"
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Item description"
          required
          className="bg-stone-900 mb-2 p-2 border rounded w-full"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded text-white"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => router.push("/crud")}
            className="bg-gray-500 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
