import React from 'react';

export const mockComponent = (name, { children, ...props }) => (
  <code name={name} props={JSON.stringify(props, null, 2)}>
    {children}
  </code>
);
