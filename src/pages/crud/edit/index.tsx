import { useLocalStorage } from "@/hooks/useLocalStorage";
import { withAuth } from "@/providers/middleware";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}

const EditItemPage = () => {
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
    <div className="mx-auto p-4 max-w-4xl container">
      <h1 className="mb-6 font-bold text-stone-900 dark:text-stone-100 text-2xl">
        Edit Item
      </h1>
      <div className="bg-stone-100 dark:bg-stone-700 shadow-md p-6 rounded-lg">
        <form onSubmit={updateItem} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="font-medium text-stone-900 dark:text-stone-100"
            >
              Item Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter item name"
              required
              className="bg-stone-200 dark:bg-stone-600 p-2 border border-stone-300 dark:border-stone-500 rounded focus:outline-none focus:ring-2 focus:ring-stone-500 w-full text-stone-900 dark:text-stone-100"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="font-medium text-stone-900 dark:text-stone-100"
            >
              Item Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter item description"
              required
              className="bg-stone-200 dark:bg-stone-600 p-2 border border-stone-300 dark:border-stone-500 rounded focus:outline-none focus:ring-2 focus:ring-stone-500 w-full text-stone-900 dark:text-stone-100"
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/crud")}
              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-stone-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-stone-100 transition-colors duration-200"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(EditItemPage);
