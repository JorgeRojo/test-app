import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Paginator from '../Paginator';

describe('Paginator.js', () => {
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
    render(<Paginator />, container);
    unmountComponentAtNode(container);
  });

  it('renders data changes', () => {
    act(() => {
      const responseData = { page: 1, total_pages: 10 };
      render(<Paginator {...{ responseData }} />, container);
    });
    expect(container).toMatchSnapshot();

    act(() => {
      const responseData = { page: 2, total_pages: 5 };
      render(<Paginator {...{ responseData }} />, container);
    });
    expect(container).toMatchSnapshot();
  });

  it('page changes when clicked', () => {
    const responseData = { page: 1, total_pages: 5 };
    const handlePageChange = jest.fn();

    act(() => {
      render(<Paginator {...{ responseData, handlePageChange }} />, container);
    });

    const button = document.querySelector(`a[href="#page_3"]`);
    expect(button.textContent).toBe('3');

    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(handlePageChange).toHaveBeenCalledTimes(1);
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });
});
