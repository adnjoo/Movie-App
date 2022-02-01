// import components
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import useKeyPress from 'react-use-keypress';
import Poster from './Poster.component';

// import other
import { useGetTvQuery } from './services/television';

function Television() {
  const [page, setPage] = useState(1);
  const { data } = useGetTvQuery(page);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const decreasePage = () => {
    if (page === 1) {
      return null;
    }
    setPage(page - 1);
    return null;
  };

  // nav shortcuts
  useKeyPress('ArrowLeft', () => {
    decreasePage();
  });
  useKeyPress('ArrowRight', () => {
    setPage(page + 1);
  });

  return (
    <Container className="my-5 customcontainer">
      <h3 className="text-center">Popular TV Shows</h3>
      <div
        className="movie-grid"
        id="movielist"
        style={{
          display: 'grid',
          justifyContent: 'center',
        }}
      >
        {data === undefined
          ? null
          : data.map((e, i) => (
            <Poster
              props={e}
           // key={i}
              itemId={i}
            />
          ))}
      </div>

      <div className="pagination">
        <div className="me-auto">
          page
          {page}
        </div>
        <p style={{ display: page === 1 ? 'none' : 'block' }}>
          <button
            type="button"
            className="btn border-dark custombtn"
            onClick={() => {
              decreasePage();
            }}
          >
            ←
          </button>
          {' '}
        </p>
        &nbsp;
        <p>
          <button
            type="button"
            className="btn border-dark custombtn"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            →
          </button>
        </p>
      </div>
    </Container>
  );
}

export default Television;
