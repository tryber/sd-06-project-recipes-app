import React from 'react';
import renderWithRouter from './tests/renderWithRouter/renderWithRouter';
import App  from './App';

describe('Todas as rotas são renderizadas', () => {
  it('A rota MainPage title="Comidas" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/comidas');
  })

  it('A rota MainPage title="Bebidas" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/bebidas');
  })

  it('A rota MainPage title="Explorar" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/explorar');
  })

  it('A rota MainPage title="Explorar Comidas" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/explorar/comidas');
  })

  it('A rota MainPage title="Explorar Bebidas" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/explorar/bebidas');
  })

  it('A rota MainPage title="Explorar Ingredientes Comidas" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/explorar/comidas/ingredientes');
  })

  it('A rota MainPage title="Explorar Ingredientes Bebidas" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/explorar/bebidas/ingredientes');
  })

  it('A rota MainPage title="Explorar Origem" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/explorar/comidas/area');
  })

  it('A rota MainPage title="Perfil" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/perfil');
  })

  it('A rota MainPage title="Receitas Feitas" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/receitas-feitas');
  })

  it('A rota MainPage title="Receitas Favoritas" é renderizada com sucesso', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');

    const routePath = history.location.pathname;

    expect(routePath).toBe('/receitas-favoritas');
  })
});
