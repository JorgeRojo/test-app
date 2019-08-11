import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mockComponent } from '../testHelpers';
import App from '../App';

jest.mock('../UserList', () => props => mockComponent('UserList', props));

describe('App.js', () => {
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
    render(<App />, container);
    unmountComponentAtNode(container);
  });

  it('renders data changes', () => {
    act(() => {
      render(<App />, container);
    });
    expect(container).toMatchSnapshot();

    act(() => {
      render(<App title="this is my data" />, container);
    });
    expect(container).toMatchSnapshot();
  });
});
