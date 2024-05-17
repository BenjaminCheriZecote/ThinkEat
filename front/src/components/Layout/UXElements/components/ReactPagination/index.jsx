
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import types from '../../../../../store/reducers/types';
import { useLocation, useNavigate } from "react-router-dom";

function PaginatedItems({itemsPerPage, favoritePage, itemsTotal}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const pageCount = Math.ceil(itemsTotal / itemsPerPage);

  const handlePageClick = (event) => {
    dispatch({
      type:(favoritePage?types.SET_FAVORITES_PAGINATION:types.SET_RECIPES_PAGINATION), 
      payload:(event.selected + 1)
    });
    navigate(location.pathname + location.search);
  };

  return (
    <>
      <ReactPaginate
        nextLabel="Suivant >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Précédent"
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
