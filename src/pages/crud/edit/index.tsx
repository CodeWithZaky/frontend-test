import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}

export default function EditItemPage() {
  const [items, setItems] = useLocalStorage<Item[]>("items", []);

  const router = useRouter();
  const queryParams = router.query;

  console.log("query", router.query.id);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  console.log({ id, name, description });

  useEffect(() => {
    if (router.isReady) {
      const idParam = queryParams.id;
      const nameParam = queryParams.name;
      const descriptionParam = queryParams.description;

      if (idParam) setId(idParam as string);
      if (nameParam) setName(nameParam as string);
      if (descriptionParam) setDescription(descriptionParam as string);
    }
  }, [router.isReady, queryParams]);

  const updateItem = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedItem = { id, name, description };
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    router.push("/crud");
  };

  const updateQueryString = (id: string, name: string, description: string) => {
    const currentParams = new URLSearchParams();
    if (id) currentParams.set("id", id);
    if (name) currentParams.set("name", name);
    if (description) currentParams.set("description", description);
    router.push(`/crud/edit?${currentParams.toString()}`);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    updateQueryString(id, e.target.value, description);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    updateQueryString(id, name, e.target.value);
  };

  return (
    <div className="mx-auto p-4 container">
      <h1 className="mb-4 font-bold text-2xl">Edit Item</h1>
      <form onSubmit={updateItem} className="mb-4">
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
            Update
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
