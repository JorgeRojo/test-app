import React from 'react';
import UserList from './UserList';

const App = ({ title }) => {
  return (
    <div className="App">
      <h1>{title || 'User list'}</h1>
      <UserList />
    </div>
  );
};

export default App;
