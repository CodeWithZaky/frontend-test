interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <div className="flex gap-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              currentPage === number
                ? "bg-blue-500 text-stone-100"
                : "bg-stone-200 dark:bg-stone-600 text-stone-900 dark:text-stone-100 hover:bg-stone-300 dark:hover:bg-stone-500"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}
