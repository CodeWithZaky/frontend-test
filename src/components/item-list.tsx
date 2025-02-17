import Link from "next/link";

type CurrentItems = {
  id: string;
  name: string;
  description: string;
};

type Props = {
  currentItems: CurrentItems[];
  deleteItem: (id: string) => void;
};

export default function ItemList({ currentItems, deleteItem }: Props) {
  return (
    <div className="space-y-4">
      {currentItems.map((item) => (
        <div
          key={item.id}
          className="bg-stone-100 dark:bg-stone-700 shadow-md p-4 rounded-lg"
        >
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-xl">
            {item.name}
          </h3>
          <p className="mt-2 text-stone-900 dark:text-stone-100">
            {item.description}
          </p>
          <div className="flex gap-2 mt-4">
            <Link
              href={`/crud/edit?id=${item.id}&name=${item.name}&description=${item.description}`}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-stone-100 transition-colors duration-200"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-stone-100 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
