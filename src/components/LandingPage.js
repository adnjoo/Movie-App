// import components
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Poster from "./Poster.component";

//import other
import useKeyPress from "react-use-keypress";
import { useGetMoviesQuery } from "./services/movies";

const LandingPage = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetMoviesQuery(page);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const decreasePage = () => {
    if (page === 1) {
      return;
    } else {
      setPage(page - 1);
    }
  };

  const setZero = () => (document.getElementById("movielist").scrollLeft = 0);

  // nav shortcuts
  useKeyPress("ArrowLeft", () => {
    setZero();
    decreasePage();
  });

  useKeyPress("ArrowRight", () => {
    setZero();
    setPage(page + 1);
  });

  return (
    <Container className="my-5 customcontainer">
      <h3 className="text-center">Popular Movies</h3>
      <div className="movie-grid" id="movielist">
        {data === undefined
          ? null
          : data.map((e, i) => {
              return <Poster props={e} key={i} itemId={i} />;
            })}
      </div>

      <div className="pagination">
        <div className="me-auto">page {page}</div>
        <p style={{ display: page === 1 ? "none" : "block" }}>
          <a
            className="btn border-dark custombtn"
            onClick={() => {
              setZero();
              decreasePage();
            }}
          >
            ←
          </a>{" "}
        </p>
        &nbsp;
        <p>
          <button
            className="btn border-dark custombtn"
            onClick={() => {
              setZero();
              setPage(page + 1);
            }}
          >
            →
          </button>
        </p>
      </div>
    </Container>
  );
};

export default LandingPage;
