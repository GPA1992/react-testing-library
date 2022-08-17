import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../pages';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it(`Testa se é exibida na tela a mensagem
    'No favorite pokemon found', caso a pessoa
      não tenha pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundPokemonText = screen.getByText(/no favorite pokemon found/i);
    expect(notFoundPokemonText).toBeInTheDocument();
  });
});
