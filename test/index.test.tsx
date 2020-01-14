import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { goBack, goTo, popToTop, Link, Router } from '../src/index';

const Three = ({ message }: any) => (
  <div onClick={() => popToTop()}>
    <h1>{message}</h1>
    <p>Click me to pop to the top</p>
  </div>
);

const Two = ({ message }: any) => (
  <div>
    This is component Two. I was passed a message:
    <p>{message}</p>
    <button onClick={() => goBack()}>
      Click me to go back to component One
    </button>
    <button onClick={() => goTo(Three, { message })}>
      Click me to go to component Three!
    </button>
  </div>
);

const One = () => {
  return (
    <Link component={Two} props={{ message: 'I came from component one!' }}>
      This is component One. Click me to route to component Two
    </Link>
  );
};

const App = () => (
  <Router>
    <One />
  </Router>
);

describe('react-chrome-extension-router', () => {
  it('allows navigation between pages', () => {
    const { getByText } = render(<App />);

    expect(
      getByText('This is component One. Click me to route to component Two')
    ).not.toBeNull();

    fireEvent.click(
      getByText('This is component One. Click me to route to component Two')
    );

    expect(getByText('I came from component one!')).not.toBeNull();

    fireEvent.click(getByText('Click me to go back to component One'));

    expect(
      getByText('This is component One. Click me to route to component Two')
    ).not.toBeNull();

    fireEvent.click(
      getByText('This is component One. Click me to route to component Two')
    );

    fireEvent.click(getByText('Click me to go to component Three!'));

    expect(getByText('I came from component one!')).not.toBeNull();

    fireEvent.click(getByText('Click me to pop to the top'));

    expect(
      getByText('This is component One. Click me to route to component Two')
    ).not.toBeNull();
  });
});
