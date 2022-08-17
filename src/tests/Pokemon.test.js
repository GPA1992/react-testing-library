import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Testa se A imagem do pokemon possui o src e o alt corretos', () => {
    renderWithRouter(<App />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', expect.stringContaining(imgURL));
    expect(pokemonImage).toHaveAttribute('alt', expect
      .stringContaining('Pikachu sprite'));
  });
  it('Testa A imagem de favorito possui o src e o alt corretos', () => {
    renderWithRouter(<App />);
    const imgURL = '/star-icon.svg';

    const pokemonDetail = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetail);

    const favoritePokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoritePokemon);

    const favoriteMarker = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoriteMarker).toBeInTheDocument();
    expect(favoriteMarker).toHaveAttribute('src', expect.stringContaining(imgURL));
    expect(favoriteMarker).toHaveAttribute('alt', expect
      .stringContaining('Pikachu is marked as favorite'));
  });
  it('Testa se é exibido na tela um texto com o tipo do pokemon', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
  });
  it('Testa se é exibido na tela um link com o href /pokemons/<id>', () => {
    renderWithRouter(<App />);
    const pokemonDetail = screen.getByRole('link', { name: /more details/i });
    expect(pokemonDetail).toHaveAttribute('href', '/pokemons/25');
  });
});
