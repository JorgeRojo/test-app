import React, { useEffect, useState, useCallback } from 'react';
import get from 'lodash.get';
import Paginator from './Paginator';
import { wrap } from 'module';

const UserList = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${page}`
        );
        if (response.status === 200) {
          setResponseData(await response.json());
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setResponseData(null);
        setIsError(true);
      }
      setIsLoading(false);
    })();
  }, [page]);

  const handlePageChange = useCallback(setPage, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading!</div>;
  }

  const data = get(responseData, 'data', []);

  return (
    <>
      <div style={styles.cardList}>
        {data.map(({ email, first_name, last_name, avatar }, index) => (
          <div key={index} style={styles.card}>
            <img width="80" src={avatar} alt={first_name} />
            <h2>
              {first_name} {last_name}
            </h2>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        ))}
      </div>
      <Paginator {...{ responseData, handlePageChange }} />
    </>
  );
};

const styles = {
  cardList: { display: 'flex', flexWrap: 'wrap' },
  card: { border: 'solid 1px #ccc', padding: '15px', margin: '15px' },
};

export default UserList;
