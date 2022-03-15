import { render, screen } from '@testing-library/react';
import rootReducer from '../src/redux/reducer';

import App from './App';
import Home from '../src/componentes/Home.jsx';
import Landing from '../src/componentes/Landing.jsx'
test('renders learn react link', () => {
  render(<App />);
  
  
  const linkElement = screen.getByText("Henry Conutries");
  expect('').toBeInTheDocument();
});
