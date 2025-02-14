import ItemList from "@/components/item-list";
import Pagination from "@/components/pagination";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useSession from "@/hooks/useSession";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  description: string;
}

export default function Crud() {
  const [items, setItems] = useLocalStorage<Item[]>("items", []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 3;
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  console.log(session);
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

  const filteredItems = items.filter((item) =>
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

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto p-4 container">
      <h1 className="mb-4 font-bold text-2xl">CRUD App with Local Storage</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded w-full"
        />
      </div>
      <Link href="/crud/add">Add Item</Link>
      <ItemList items={currentItems} onDelete={deleteItem} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
