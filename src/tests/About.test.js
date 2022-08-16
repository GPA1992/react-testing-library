import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../pages';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstPrgpPartOne = 'This application simulates a Pokédex,';
    const firstPrgpPartTwo = ' a digital encyclopedia containing all Pokémons';
    const aboutInfoOne = screen.getByText(`${firstPrgpPartOne}${firstPrgpPartTwo}`);
    expect(aboutInfoOne).toBeInTheDocument();
    const secondPrgpPartOne = 'One can filter Pokémons by type,';
    const secondPrgpPartTwo = ' and see more details for each one of them';
    const aboutInfo = screen.getByText(`${secondPrgpPartOne}${secondPrgpPartTwo}`);
    expect(aboutInfo).toBeInTheDocument();
  });
  it(`Teste se a página contém a seguinte imagem de uma Pokédex
  (https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png)`, () => {
    renderWithRouter(<About />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining(imgURL));
  });
});
