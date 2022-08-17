import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it(`Teste se a página contém um heading 
  h2 com o texto Page requested not found`, () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen
      .getByRole('heading', { name: /Page requested not found/i });
    expect(notFoundText).toBeInTheDocument();
  });
  it(`Teste se a página mostra a imagem 
  (https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif)`, () => {
    renderWithRouter(<NotFound />);
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pikachuCrying = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(pikachuCrying).toBeInTheDocument();
    expect(pikachuCrying).toHaveAttribute('src', expect.stringContaining(imgURL));
  });
});
