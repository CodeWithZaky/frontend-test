import { useLocalStorage } from "@/hooks/useLocalStorage";
import { withAuth } from "@/providers/middleware";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}

const AddItemPage = () => {
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
    <div className="mx-auto p-4 max-w-4xl container">
      <h1 className="mb-6 font-bold text-stone-900 dark:text-stone-100 text-2xl">
        Add Item
      </h1>
      <div className="bg-stone-100 dark:bg-stone-700 shadow-md p-6 rounded-lg">
        <form onSubmit={AddItem} className="space-y-4">
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
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddItemPage);
