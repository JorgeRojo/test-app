import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mockComponent } from '../testHelpers';
import UserList from '../UserList';

const mockResponseData = {
  page: 2,
  per_page: 3,
  total: 12,
  total_pages: 4,
  data: [
    {
      id: 4,
      email: 'eve.holt@reqres.in',
      first_name: 'Eve',
      last_name: 'Holt',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg',
    },
    {
      id: 5,
      email: 'charles.morris@reqres.in',
      first_name: 'Charles',
      last_name: 'Morris',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg',
    },
    {
      id: 6,
      email: 'tracey.ramos@reqres.in',
      first_name: 'Tracey',
      last_name: 'Ramos',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg',
    },
  ],
};

jest.mock('../Paginator', () => props => mockComponent('Paginator', props));

describe('UserList.js', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders without crashing', () => {
    render(<UserList />, container);
    unmountComponentAtNode(container);
  });

  it('renders loader before data is loaded', async () => {
    act(() => {
      render(<UserList />, container);
    });
    expect(container).toMatchSnapshot();
    expect(container.textContent).toBe('Loading...');
  });

  it('renders error when api call fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject({
        status: 500,
      })
    );
    await act(async () => {
      render(<UserList />, container);
    });
    expect(container).toMatchSnapshot();
    expect(container.textContent).toBe('Error loading!');
    global.fetch.mockRestore();
  });

  it('renders error when api call is wrong', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        status: 404,
        json: () => Promise.resolve(mockResponseData),
      })
    );
    await act(async () => {
      render(<UserList />, container);
    });
    expect(container).toMatchSnapshot();
    expect(container.textContent).toBe('Error loading!');
    global.fetch.mockRestore();
  });

  it('renders users data with success api call', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResponseData),
      })
    );
    await act(async () => {
      render(<UserList />, container);
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://reqres.in/api/users?page=1'
    );
    expect(container).toMatchSnapshot();
    global.fetch.mockRestore();
  });
});
