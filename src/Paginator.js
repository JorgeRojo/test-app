import React from 'react';
import range from 'lodash.range';
import get from 'lodash.get';

const Paginator = ({ responseData, ...props }) => {
  const currentPage = get(responseData, 'page', 1);
  const totalPages = get(responseData, 'total_pages', 1);

  const handlePageChange = page => e => {
    e.preventDefault();
    props.handlePageChange(page);
  };

  return (
    <nav>
      <hr />
      <ul style={styles.list}>
        {range(1, totalPages + 1).map(page => (
          <li key={page} style={styles.listItem}>
            <a onClick={handlePageChange(page)} href={`#page_${page}`}>
              {currentPage === page ? <b>{page}</b> : <span>{page}</span>}
            </a>
          </li>
        ))}
      </ul>
      <hr />
    </nav>
  );
};

const styles = {
  list: { listStyle: 'none' },
  listItem: { display: 'inline-block', padding: '10px' },
};

export default Paginator;
