import Link from "next/link";

interface Item {
  id: string;
  name: string;
  description: string;
}

interface ItemListProps {
  items: Item[];
  onDelete: (id: string) => void;
}

export default function ItemList({ items, onDelete }: ItemListProps) {
  return (
    <div>
      {items ? (
        items.map((item) => {
          // const queryParams = new URLSearchParams({
          //   name: item.name,
          //   description: item.description,
          // }).toString();
          return (
            <div key={item.id} className="mb-2 p-4 border rounded">
              <>
                <h3 className="font-bold">{item.name}</h3>
                <p>{item.description}</p>
                <div className="mt-2">
                  <Link
                    href={`/crud/edit?id=${item.id}`}
                    className="bg-blue-500 mr-2 px-2 py-1 rounded text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="bg-red-500 px-2 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </>
            </div>
          );
        })
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
}
