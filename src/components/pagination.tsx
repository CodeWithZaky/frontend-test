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
    <div>
      <div className="flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <div key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded  ${
                currentPage === number
                  ? "bg-blue-500 text-stone-100 dark:text-stone-100"
                  : "bg-gray-200 text-stone-900"
              }`}
            >
              {number}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
