import ItemList from "@/components/item-list";
import Pagination from "@/components/pagination";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useSession from "@/hooks/useSession";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Item {
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

  console.log(currentItems);

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
    <div className="flex flex-col gap-5 mx-auto p-4 container">
      <h1 className="mb-4 font-bold text-stone-900 dark:text-stone-100 text-2xl">
        CRUD App with Local Storage
      </h1>
      <div>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
          className="bg-stone-900 dark:bg-stone-900 p-2 border rounded w-full text-stone-900 dark:text-stone-100"
        />
      </div>
      <Link
        href="/crud/add"
        className="bg-green-500 px-4 py-1 rounded-md w-fit font-bold text-stone-900 dark:text-stone-100 text-xl"
      >
        Add Item
      </Link>
      <ItemList currentItems={currentItems} deleteItem={deleteItem} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
