import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe(`Teste se o topo da aplicação 
contém um conjunto fixo de links de navegação`, () => {
  it('Testa se pagina APP renderiza na pagina inicial', () => {
    renderWithRouter(<App />);
    const homeTitle = screen.getByRole('heading', {
      name: 'Pokédex',
    });
    expect(homeTitle).toBeInTheDocument();
  });

  it(`Teste se o topo da aplicação contém 3
       link's com o texto Home, About e Favorite Pokémons`, () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    const favoritePolemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePolemonsLink).toBeInTheDocument();
  });

  it(`Testa se ao clicar no 
  link "Home" a aplicação é redirecionada 
  para pagina inicial na URL "/"`, () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    console.log(history);
    console.log(pathname);
    expect(pathname).toBe('/');
  });
  it(`Testa se ao clicar no 
  link "About" a aplicação é redirecionada 
  para pagina inicial na URL "/about"`, () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it(`Testa se ao clicar no 
  link "Favorite Pokémons" a aplicação é redirecionada 
  para pagina inicial na URL "/favorites"`, () => {
    const { history } = renderWithRouter(<App />);
    const favoritePolemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritePolemonsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
