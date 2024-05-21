
import ReactPaginate from 'react-paginate';
import { useSearchParams } from "react-router-dom";


function PaginatedItems({itemsPerPage, favoritePage, itemsTotal}) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const pageCount = Math.ceil(itemsTotal / itemsPerPage);

  let forcePage = searchParams.get("page");
  if (!forcePage) forcePage = 1;
  if (forcePage - 1 > pageCount) forcePage = 1;
  

  const handlePageClick = (event) => {
    setterUrl(event.selected + 1);
  };

  const setterUrl = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    params.set("page", `${page}`);
    const stringParams = params.toString();
    // on met à jour l'url
    setSearchParams(stringParams);
  }

  return (
    <>
      <ReactPaginate
        previousLabel="< Précédent"
        nextLabel="Suivant >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        forcePage={forcePage - 1}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="page-active"
        renderOnZeroPageCount={null}
      />
      
    </>
  );
}

export default PaginatedItems;
