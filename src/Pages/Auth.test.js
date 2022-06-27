import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Auth from './Auth';

function Wrapper() {
  return (<MemoryRouter><Auth /></MemoryRouter>);
}


describe('Auth', () => {

  let location;

  beforeEach(() => {
    location = window.location;
  });
  afterEach(() => {
    window.location = location;
  });

  test.skip('no params', () => {
    const location = new URL('https://localhost:3000/auth');
    location.assign = jest.fn();
    location.reload = jest.fn();
    location.replace = jest.fn();

    delete window.location;
    window.location = location;

    let root = create(<Wrapper />);
    
  });

  test.skip('ok', () => {
    delete window.location;
    window.location = new URL('https://localhost:3000/auth?client_id=1234');

    let root = create(<Wrapper />);

  });
});
