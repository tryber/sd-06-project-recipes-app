import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Explore from './pages/Explore';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import renderWithRouter from './TESTE/renderWithRouter';

describe('Login Page', () => {
  it('Email input, login button and password input must exist.', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginBtn = getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
  it('Enable to write an email address', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');

    fireEvent.change(emailInput, {target: {value: 'email@email.com' } });
    expect(emailInput.value).toBe('email@email.com');
  });
  it('Enable to write an email address', () => {
    const { getByTestId } = render(<Login />);
    const passwordInput = getByTestId('password-input');

    fireEvent.change(passwordInput, { target: {value: '654321' } });
    expect(passwordInput.value).toBe('654321');
  });
  it("Disable btn with wrong email or password shape ", () => {
    const { getByTestId } = render(<Login />);
    const emailShape = getByTestId("email-input");
    const passwordShape = getByTestId("password-input");
    const loginBtn = getByTestId("login-submit-btn");

    expect(loginBtn).toBeDisabled();

    fireEvent.change(emailShape, { target: { value: "email@emailcom" } });
    fireEvent.change(passwordShape, { target: { value: "7654321" } });
    expect(loginBtn).toBeDisabled();
  });
  it('Disable btn with wrong email and password shape ', () => {
    const { getByTestId } = render(<Login />);
    const emailShape = getByTestId('email-input');
    const passwordShape = getByTestId('password-input');
    const loginBtn = getByTestId('login-submit-btn');

    expect(loginBtn).toBeDisabled();

    fireEvent.change(emailShape, {target: { value: 'email@emailcom' } });
    fireEvent.change(passwordShape, {target: { value: '7654321' } });
    expect(loginBtn).toBeDisabled();
  });
  it('Disable btn with wrong email shape but correct password shape ', () => {
    const { getByTestId } = render(<Login />);
    const emailShape = getByTestId('email-input');
    const passwordShape = getByTestId('password-input');
    const loginBtn = getByTestId('login-submit-btn');

    expect(loginBtn).toBeDisabled();

    fireEvent.change(emailShape, {target: { value: 'email@emailcom' } });
    fireEvent.change(passwordShape, {target: { value: '654321' } });
    expect(loginBtn).toBeDisabled();
  });
  it('Disable btn with wrong password shape but correct email shape ', () => {
    const { getByTestId } = render(<Login />);
    const emailShape = getByTestId('email-input');
    const passwordShape = getByTestId('password-input');
    const loginBtn = getByTestId('login-submit-btn');

    expect(loginBtn).toBeDisabled();

    fireEvent.change(emailShape, {target: { value: 'email@emailcom' } });
    fireEvent.change(passwordShape, {target: { value: '7654321' } });
    expect(loginBtn).toBeDisabled();
  });
  it('Disable btn with password length less than 6', () => {
    const { getByTestId } = render(<Login />);
    const emailShape = getByTestId('email-input');
    const passwordShape = getByTestId('password-input');
    const loginBtn = getByTestId('login-submit-btn');

    fireEvent.change(emailShape, {target: { value: 'email@emailcom' } });
    fireEvent.change(passwordShape, {target: { value: '54321' } });
    expect(loginBtn).toBeDisabled();
  });
  it('Enable btn with correct password and email shape', () => {
    const { getByTestId } = render(<Login />);
    const emailShape = getByTestId('email-input');
    const passwordShape = getByTestId('password-input');
    const loginBtn = getByTestId('login-submit-btn');

    fireEvent.change(emailShape, {target: { value: 'email@emailcom' } });
    fireEvent.change(passwordShape, {target: { value: '54321' } });
    expect(loginBtn).not.toBeDisabled();
  });
  afterEach(() => {
    it('After click on the login btn, must save mealToken and cockTailToken in localStorage', () => {
      const { getByTestId } = render(<Login />);
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const loginBtn = getByTestId('login-submit-btn');
  
      fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '654321' } })
      fireEvent.click(loginBtn)
  
      expect(localStorage.getItem('mealsToken')).toBe("1");
      expect(localStorage.getItem('cocktailsToken')).toBe("1");
      cleanup()
    });
  });
    afterEach(() => { 
    it('After click on the login btn, must save email in localStorage', () => {
      const { getByTestId } = render(<Login />);
      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const loginBtn = getByTestId('login-submit-btn');

      fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
      fireEvent.change(passwordInput, { target: { value: '12345678' } })
      fireEvent.click(loginBtn)

      const user = JSON.parse(localStorage.getItem('user'))

      expect(user.email).toBe(emailInput.value);
    });
  });
  it('Path to Login page must be "/"', () => {
    const { history } = renderWithRouter(<Login />);
    const {location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});

describe('Header page', () => {
  it('Profile btn, page title and search btn, must exist.', () => {
    const { getByTestId } = render(<Header />);
    const profileBtn = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');
    const topSearchBtn = getByTestId('search-top-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(topSearchBtn).toBeInTheDocument();
  });
  it('There is no Header rendered in login page', () => {
    const { getByRole } = render(<Login />);
    const headerComponent = getByRole(<Header />);
    
    expect(headerComponent).not.toBeInTheDocument();
  });
  it('There is no Header rendered in MenuDetails page', () => {
    const { getByRole } = render(<MenuDetails />);
    const headerComponent = getByRole(<Header />);
    
    expect(headerComponent).not.toBeInTheDocument();
  });
  it('New It', () => {
    
  });

});

describe('Header SearchBar', () =>{
  it('SearchBar, radioBtns, and searchBtn, must exist.', () => {
    const { getByTestId } = renderWithRouter(<Header />);
    const searchBarInput = getByTestId('search-input');
    const ingredientRadio = getByTestId('ingredient-search-radio');
    const nameRadio = getByTestId('name-search-radio');
    const firstLetterRadio = getByTestId('first-letter-search-radio');
    const searchBarBtn = getByTestId('exec-search-btn')

    expect(searchBarInput).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBarBtn).toBeInTheDocument();
  });
  it('There is no Header rendered in MenuDetails page', () => {
    const { getByRole } = render(<MenuDetails />);
    const headerComponent = getByRole(<Header />);
    
    expect(headerComponent).not.toBeInTheDocument();
  });
});

describe('Footer component', () =>{
  it('drinkBtn,exploreBtn and foodBtn must exist', () => {
    const { getByTestId } = render(<Footer />);
    const drinkBtn = getByTestId('drinks-bottom-btn');
    const exploreBtn = getByTestId('explore-bottom-btn');
    const foodBtn = getByTestId('food-bottom-btn');

    expect(drinkBtn).toBeInTheDocument();
    expect(exploreBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
  });
  it('Footer on Menu page must exist.', () => {
    const { getByRole } = render(<Menu />);
    const footerComponent = getByRole(<Footer />);

    expect(footerComponent).toBeInTheDocument();
  });
  it('Footer on Explorer page must exist', () => {
    const { getByRole } = render(<Explore />);
    const footerComponent = getByRole(<Footer />);

    expect(footerComponent).toBeInTheDocument();
  });
  it('Footer on Profile page must exist', () => {
    const { getByRole } = render(<Profile />);
    const footerComponent = getByRole(<Footer />);

    expect(footerComponent).toBeInTheDocument();
  });
  it('Footer on DrinkRecipeDetails page must not exist', () => {
    const { getByRole } = render(<RecipeDetails />);
    const footerComponent = getByRole(<Footer />);

    expect(footerComponent).not.toBeInTheDocument();
  });
  it('Footer on RecipeInProcess page must not exist.', () => {
    const { getByRole } = render(<RecipeInProcess />);
    const footerComponent = getByRole(<Footer />);

    expect(footerComponent).not.toBeInTheDocument();
  });
  it('Footer on DoneRecipes page must not exist', () => {
    const { getByRole } = render(<DoneRecipes />);
    const footerComponent = getByRole(<Footer />);

    expect(footerComponent).not.toBeInTheDocument();
  });
  it('Footer on FavoriteRecipes must not exist', () => {
    const { getByRole } = render(<FavoriteRecipes />);
    const footerComponent = getByRole(<Footer />);

    expect(footerComponent).not.toBeInTheDocument();
  });
  it('Must have link to path "/bebidas"', () => {
    const { history, getByAltText } = renderWithRouter(<Footer />);
    fireEvent.click(getByAltText(/DRINKS/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
  it('Must have link to path "/explorar"', () => {
    const { history, getByAltText } = renderWithRouter(<Footer />);
    fireEvent.click(getByAltText(/EXPLORE/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
  it('Must have link to path /comidas', () => {
    const { history, getByAltText } = renderWithRouter(<Footer />);
    fireEvent.click(getByAltText(/FOOD/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  })
});

describe('Profile Page', () =>{
  it('Receitas Feitas btn must exist and redirect to "/receitas-feitas"', () => {
    const { history, getByRole } = renderWithRouter(<Profile />);
    const receitasFeitasBtn = getByRole('button', {name: /Receitas Feitas/i});
    expect(receitasFeitasBtn).toBeInTheDocument();
    const receitasFeitasTrace = '/receitas-feitas';
    fireEvent.click(receitasFeitasTrace);
    expect(history.location.pathname).toBe(receitasFeitasTrace);
  });
  it('Receitas Favoritas btn must exist and redirect to "/receitas-favoritas"', () => {
    const { history, getByRole } = renderWithRouter(<Profile />);
    const receitasFavoritasBtn = getByRole('button', { name: /Receitas Favoritas/i });
    expect(receitasFavoritasBtn).toBeInTheDocument();
    const receitasFavoritasTrace = '/receitas-favoritas';
    fireEvent.click(receitasFavoritasTrace);
    expect(history.location.pathname).toBe(receitasFavoritasTrace);
  });
  it('Sair btn must exist and redirect to "/login"', () => {
    const { history, getByRole} = renderWithRouter(<Profile />);
    const sairBtn = getByRole('button', { name: /Sair/i });
    expect(sairBtn).toBeInTheDocument();
    const sairBtnTrace = '/login';
    fireEvent.click(sairBtn);
    expect(history.location.pathname).toBe(sairBtnTrace);
  });
  
});

describe('Explore Page', () =>{
  it('Explorer Comidas Btn must exist and redirect to "/explorar/comidas"', () => {
    const { history, getByRole } = renderWithRouter(<Explore />);
    const exploreFoodBtn = getByRole('button', { name: /Explorar Comidas/i })
    const exploreFoodTrace = '/explorar/comidas';
    expect(exploreFoodBtn).toBeInTheDocument();

    fireEvent.click(exploreFoodTrace);
    expect(history.location.pathname).toBe(exploreFoodTrace);
  });
  it('Explore Bebidas btn must exist and redirect to "/explorar/bebidas"', () => {
    const { history, getByRole } = renderWithRouter(<Explore />);
    const exploreDrinkBtn = getByRole('button', { name: /Explorar Bebidas/i })
    const exploreDrinkTrace = '/explorar/bebidas';

    expect(exploreDrinkBtn).toBeInTheDocument();
    fireEvent.click(exploreDrinkTrace);
    expect(history.location.pathname).toBe(exploreDrinkTrace);
  });
  
});

describe('ReceitasFeitas Page', () =>{
  it('Must have all, food and drinks btn', () => {
    const { getByRole } = render(<ReceitasFeitas />);
    const allBtn = getByRole('button', { name: /All/i });
    const foodBtn = getByRole('button', { name: /Food/i })
    const drinkBtn = getByRole('button', { name: /Drink/i })
    expect(drinkBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
  });
});

describe('ReceitasFavoritas Page', () =>{
  it('Must all, food and drinks btn', () => {
  });
});