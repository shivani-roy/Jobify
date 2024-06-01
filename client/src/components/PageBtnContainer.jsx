import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/jobs/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  // const renderPageButtons = () => {
  //   const pageButtons = [];

  //   // 1. add the first page button
  //   pageButtons.push(
  //     addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
  //   );

  //   // 6. add the dots before the current page if there are more than 3 pages
  //   if (currentPage > 3) {
  //     pageButtons.push(
  //       <span
  //         className="page-btn dots"
  //         key="dots-1"
  //       >
  //         ...
  //       </span>
  //     );
  //   }

  //   // 4. add one before the current page
  //   if (currentPage !== 1 && currentPage !== 2) {
  //     pageButtons.push(
  //       addPageButton({ pageNumber: currentPage - 1, activeClass: false })
  //     );
  //   }

  //   // 3. add the current page
  //   if (currentPage !== 1 && currentPage !== numOfPages) {
  //     pageButtons.push(
  //       addPageButton({ pageNumber: currentPage, activeClass: true })
  //     );
  //   }

  //   // 5. add one after the current page
  //   if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
  //     pageButtons.push(
  //       addPageButton({ pageNumber: currentPage + 1, activeClass: false })
  //     );
  //   }

  //   // if (currentPage < 3 && numOfPages > 3) {
  //   //   pageButtons.push(
  //   //     addPageButton({ pageNumber: currentPage + 2, activeClass: false })
  //   //   );
  //   //   // pageButtons.push(addPageButton({ pageNumber: 4, activeClass: false }));
  //   // }

  //   // 7. add the dots after the current page
  //   if (currentPage < numOfPages - 2) {
  //     pageButtons.push(
  //       <span
  //         className="page-btn dots"
  //         key="dots+1"
  //       >
  //         ...
  //       </span>
  //     );
  //   }

  //   // 2. add the last page button
  //   pageButtons.push(
  //     addPageButton({
  //       pageNumber: numOfPages,
  //       activeClass: currentPage === numOfPages,
  //     })
  //   );

  //   console.log(pageButtons);
  //   return pageButtons;
  // };

  const renderPageButtons = () => {
    const pageButtons = [];

    // 1. add the first page button
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // 7. add the dots before the current page if there are more than 3 pages
    if (currentPage > 3 && numOfPages > 5) {
      pageButtons.push(
        <span
          className="page-btn dots"
          key="dots-1"
        >
          ...
        </span>
      );
    }

    // 2. add the 2-4 page buttons
    if (currentPage < 4) {
      for (let i = 2; i < numOfPages && i < 5; i++) {
        pageButtons.push(
          addPageButton({ pageNumber: i, activeClass: currentPage === i })
        );
      }
    }

    // 5. add one before the current page
    if (currentPage > 3 && currentPage < numOfPages - 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      );
    }

    // 4. add the current page
    if (currentPage > 3 && currentPage < numOfPages - 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    }

    // 6. add one after the current page
    if (currentPage > 3 && currentPage < numOfPages - 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      );
    }

    // 9. add the 3 pages before the last page
    if (currentPage > 3 && currentPage >= numOfPages - 2) {
      for (let i = numOfPages - 3; i < numOfPages; i++) {
        if (i === 1) continue;
        pageButtons.push(
          addPageButton({ pageNumber: i, activeClass: i === currentPage })
        );
      }
    }

    // 8. add the dots after the current page
    if (currentPage <= numOfPages - 3 && numOfPages > 5) {
      pageButtons.push(
        <span
          className="page-btn dots"
          key="dots+1"
        >
          ...
        </span>
      );
    }

    // 3. add the last page button
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );

    // console.log(pageButtons);
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) {
            prevPage = numOfPages;
          }
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft /> Prev
      </button>

      <div className="btn-container">
        {/* {pages.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${
                pageNumber === currentPage ? "active" : ""
              }`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })} */}

        {renderPageButtons()}
      </div>

      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) {
            nextPage = 1;
          }
          handlePageChange(nextPage);
        }}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  height: 6rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  .btn-container {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    display: flex;
  }

  .page-btn {
    background: transparent;
    border: none;
    width: 60px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    border-radius: var(--border-radius);
    cursor: pointer;
  }

  .active {
    background: var(--primary-500);
    color: var(--white);
  }

  .prev-btn,
  .next-btn {
    background: var(--background-secondary-color);
    border-color: transparent;
    border-radius: var(--border-radius);
    width: 100px;
    height: 40px;
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 1rem;
    gap: 0.5rem;
  }

  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
    transition: var(--transition);
  }

  .dots {
    display: grid;
    place-items: center;
    cursor: text;
  }
`;

export default PageBtnContainer;
