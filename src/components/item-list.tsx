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
    <div>
      {currentItems.map((item) => (
        <div
          key={item.id}
          className="mb-2 p-4 border border-stone-900 dark:border-stone-100 rounded"
        >
          <h3 className="font-bold text-stone-900 dark:text-stone-100">
            {item.name}
          </h3>
          <p className="text-stone-900 dark:text-stone-100">
            {item.description}
          </p>
          <div className="mt-2">
            <Link
              href={`/crud/edit?id=${item.id}&name=${item.name}&description=${item.description}`}
              className="bg-blue-500 mr-2 px-2 py-1 rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-500 px-2 py-1 rounded text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
