import ItemForm from "@/components/item-form";
import ItemList from "@/components/item-list";
import Pagination from "@/components/pagination";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useSession from "@/hooks/useSession";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useLocalStorage<Item[]>("items", []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 3;
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, session?.status]);

  useEffect(() => {
    const page = searchParams.get("page");
    const search = searchParams.get("search");
    if (page) setCurrentPage(Number.parseInt(page));
    if (search) setSearchTerm(search);
  }, [searchParams]);

  const filteredItems = items.filter((item: Item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    updateQueryString(pageNumber, searchTerm);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    updateQueryString(1, term);
  };

  const updateQueryString = (page: number, search: string) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (search) params.set("search", search);
    router.push(`?${params.toString()}`);
  };

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const updateItem = (updatedItem: Item) => {
    setItems(
      items.map((item: Item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item: Item) => item.id !== id));
  };

  return (
    <div className="mx-auto p-4 container">
      <h1 className="mb-4 font-bold text-stone-900 dark:text-stone-100 text-2xl">
        CRUD App with Local Storage
      </h1>
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
          className="bg-stone-900 dark:bg-stone-900 p-2 border rounded w-full text-stone-900 dark:text-stone-100"
        />
      </div>
      <p className="font-bold text-stone-900 dark:text-stone-100 text-xl">
        Add Item
      </p>
      <ItemForm onSubmit={addItem} />
      <ItemList
        items={currentItems}
        onUpdate={updateItem}
        onDelete={deleteItem}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
