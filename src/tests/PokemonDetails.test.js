import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemon from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  it(`Teste se a página contém um heading 
  h2 com o texto Encountered pokémons`, () => {
    renderWithRouter(<App />);

    const detailButoon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailButoon);

    const ecounteredPokemons = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });

    expect(ecounteredPokemons).toBeInTheDocument();
  });

  it(`Não deve existir o link de navegação para 
  os detalhes do pokémon selecionado`, () => {
    renderWithRouter(<App />);

    const detailButoon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailButoon);
    expect(detailButoon).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);

    const detailButoon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailButoon);

    const { summary } = pokemon[0];
    const summaryHeading = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const summaryText = screen.getByText(summary);
    expect(summaryHeading).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });

  it('É exibido na tela um h2 com o texto Game Locations of <name>', () => {
    renderWithRouter(<App />);

    const detailButoon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailButoon);

    const pokemonLocation = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(pokemonLocation).toBeInTheDocument();
  });

  it('É exibido na tela uma label com o texto Pokémon favoritado?', () => {
    renderWithRouter(<App />);

    const detailButoon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailButoon);

    const ifFavoritePokemon = screen.getByText(/pokémon favoritado\?/i);
    expect(ifFavoritePokemon).toBeInTheDocument();
  });

  it('São exibidas na tela imagens de localização com o src correto', () => {
    renderWithRouter(<App />);
    const kantoViridianForest = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const kantoPowerPlant = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const detailButoon = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailButoon);

    const pokemonImgLocation = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(pokemonImgLocation).toHaveLength(2);
    expect(pokemonImgLocation[0]).toHaveAttribute('src', expect
      .stringContaining(kantoViridianForest));
    expect(pokemonImgLocation[1]).toHaveAttribute('src', expect
      .stringContaining(kantoPowerPlant));
  });
});
