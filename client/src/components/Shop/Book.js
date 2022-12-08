import React from 'react';

function Book(props) {
  const { text, page, setPage } = props;

  // calculate the maximum page number
  const maxPage = Math.ceil(text.length / 500);

  // extract the current page text
  const pageText = text.substring((page - 1) * 500, page * 500);

  // extract the previous page number
  const prevPage = page - 1 > 0 ? page - 1 : null;

  // extract the next page number
  const nextPage = page + 1 <= maxPage ? page + 1 : null;

  return (
    <div>
      <div>{pageText}</div>
      <div>
        <button disabled={prevPage === null} onClick={() => setPage(prevPage)}>
          Prev Page
        </button>
        <button disabled={nextPage === null} onClick={() => setPage(nextPage)}>
          Next Page
        </button>
        <span> Page {page} of {maxPage}</span>
      </div>
    </div>
    </div>

}

 export default Book;