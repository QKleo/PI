import { render, screen } from '@testing-library/react';
import Landing from './components/Landing';
import Paginado from './components/Paginado';
import App from './App';
//learn react
test('renders learn react link', () => {
  render(<Paginado/>);
  const linkElement = screen.getByText('</button>');
  expect(linkElement).toBeInTheDocument('</button>');
});
