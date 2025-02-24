import ItemList from "@/components/item-list";
import Pagination from "@/components/pagination";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { withAuth } from "@/providers/middleware";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Item {
  id: string;
  name: string;
  description: string;
}

const Crud = () => {
  const [items, setItems] = useLocalStorage<Item[]>("items", []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 3;
  const searchParams = useSearchParams();
  const router = useRouter();

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
  const currentItems = filteredItems
    .reverse()
    .slice(indexOfFirstItem, indexOfLastItem);

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

  const deleteItem = (id: string) => {
    setItems(items.filter((item: Item) => item.id !== id));
  };

  return (
    <div className="flex flex-col gap-5 mx-auto p-4 max-w-4xl container">
      <h1 className="mb-4 font-bold text-stone-900 dark:text-stone-100 text-2xl">
        CRUD App with Local Storage
      </h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
          className="bg-stone-100 dark:bg-stone-700 p-2 border border-stone-300 dark:border-stone-600 rounded focus:outline-none focus:ring-2 focus:ring-stone-500 w-full text-stone-900 dark:text-stone-100"
        />
        <Link
          href="/crud/add"
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-fit font-bold text-stone-100 text-lg transition-colors duration-200"
        >
          Add Item
        </Link>
      </div>
      <ItemList currentItems={currentItems} deleteItem={deleteItem} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default withAuth(Crud);
