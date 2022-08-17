import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const nextPokemonStr = 'next-pokemon';
const pokemonsTypes = [...new Set(pokemons
  .reduce((types, { type }) => [...types, type], []))];

describe('Testa o componente <Pokedex.js', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingText = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(headingText).toBeInTheDocument();
  });
  it(`Testa se é exibido o próximo pokémon
   da lista quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByTestId(nextPokemonStr);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(nextPokemonBtn).toBeInTheDocument();
    userEvent.click(nextPokemonBtn);
    expect(pokemonName).toBeInTheDocument();
  });
  it(`O primeiro pokémon da lista 
  deve ser mostrado ao clicar no botão, 
  se estiver no último pokémon da lista`, () => {
    renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const actualPokemon = screen.getByText(pokemon.name);
      expect(actualPokemon).toBeInTheDocument();
      const nextPokemonBtn = screen.getByTestId(nextPokemonStr);
      userEvent.click(nextPokemonBtn);
      if (pokemon.name === 'Dragonair') {
        const firstPokemon = screen.getByText(/Pikachu/i);
        expect(firstPokemon).toBeInTheDocument();
      }
    });
  });
  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    pokemonsTypes.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      const nextPokemonBtn = screen.getByTestId(nextPokemonStr);
      userEvent.click(nextPokemonBtn);
      const thisType = screen.getByTestId('pokemon-type');
      expect(thisType).toHaveTextContent(type);
    });
    const allFilterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allFilterButtons).toHaveLength(pokemonsTypes.length);
  });
  it('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    expect(allButton).toBeEnabled();
    userEvent.click(allButton);
    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toHaveTextContent('Electric');
  });
});
