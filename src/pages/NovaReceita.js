import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';

function NovaReceita() {
  const [count, setCount] = useState(1);
  const [nomeReceita, setNomeReceita] = useState('');
  const [tipo, setTipo] = useState('');
  const [alcoolico, setAlcoolico] = useState('');
  const [categoriaComida, setCategoriaComida] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [modoPreparo, setModoPreparo] = useState('');
  const [imagem, setImagem] = useState('');

  const history = useHistory();

  function novoIngrediente() {
    const divIngredientes = document.getElementById('fieldset-ingredientes');
    const labelIngrediente = document.createElement('label');
    labelIngrediente.innerText = `Ingrediente ${count + 1}: `;
    const novoInputIngrediente = document.createElement('input');
    novoInputIngrediente.classList = 'ingrediente';
    novoInputIngrediente.type = 'text';
    novoInputIngrediente.addEventListener('keyup', (e) => {
      setIngredientes([...ingredientes, e.target.value]);
    });
    const br = document.createElement('br');
    divIngredientes.appendChild(labelIngrediente);
    divIngredientes.appendChild(novoInputIngrediente);
    divIngredientes.appendChild(br);
  }

  function verificaTipo(tipoCategoria) {
    const divTipo = document.getElementById('div-tipo');
    const elementoCategoria = divTipo.querySelector('#categoria-comida');
    const elementoLabelCategoria = divTipo.querySelector('#label-categoria');
    const elementoRadioAlcoolico = divTipo.querySelector('#alcoolico');
    const elementoRadioNaoAlcoolico = divTipo.querySelector('#nao-alcoolico');
    const elementoLabelAlcoolico = divTipo.querySelector('#label-alcoolico');
    const elementoLabelNaoAlcoolico = divTipo.querySelector('#label-nao-alcoolico');

    const inputCategoria = document.createElement('input');
    inputCategoria.type = 'text';
    inputCategoria.id = 'categoria-comida';
    inputCategoria.placeholder = 'Sobremesas, Pães, Bolos';
    inputCategoria.addEventListener('keyup', (e) => {
      inputCategoria.setAttribute('value', e.target.value);
      setCategoriaComida(e.target.value);
    });

    const labelCategoria = document.createElement('label');
    labelCategoria.innerText = 'Categoria: ';
    labelCategoria.setAttribute('for', 'categoria-comida');
    labelCategoria.id = 'label-categoria';

    const radioAlcoolico = document.createElement('input');
    radioAlcoolico.setAttribute('type', 'radio');
    radioAlcoolico.setAttribute('value', 'alcoolico');
    radioAlcoolico.setAttribute('name', 'tipoBebida');
    radioAlcoolico.id = 'alcoolico';
    radioAlcoolico.addEventListener('click', () => setAlcoolico('alcoólico'));

    const labelAlcoolico = document.createElement('label');
    labelAlcoolico.innerText = 'Alcoólico';
    labelAlcoolico.setAttribute('for', 'alcoolico');
    labelAlcoolico.id = 'label-alcoolico';

    const radioNaoAlcoolico = document.createElement('input');
    radioNaoAlcoolico.setAttribute('type', 'radio');
    radioNaoAlcoolico.setAttribute('value', 'nao-alcoolico');
    radioNaoAlcoolico.setAttribute('name', 'tipoBebida');
    radioNaoAlcoolico.id = 'nao-alcoolico';
    radioNaoAlcoolico.addEventListener('click', () => setAlcoolico('não alcoólico'));

    const labelNaoAlcoolico = document.createElement('label');
    labelNaoAlcoolico.innerText = 'Não Alcoólico';
    labelNaoAlcoolico.setAttribute('for', 'nao-alcoolico');
    labelNaoAlcoolico.id = 'label-nao-alcoolico';

    if (elementoRadioAlcoolico !== null) {
      elementoRadioAlcoolico.parentNode.removeChild(elementoRadioAlcoolico);
      elementoRadioNaoAlcoolico.parentNode.removeChild(elementoRadioNaoAlcoolico);
      elementoLabelAlcoolico.parentNode.removeChild(elementoLabelAlcoolico);
      elementoLabelNaoAlcoolico.parentNode.removeChild(elementoLabelNaoAlcoolico);
      setAlcoolico('');
    }

    if (elementoCategoria !== null) {
      elementoCategoria.parentNode.removeChild(elementoCategoria);
      elementoLabelCategoria.parentNode.removeChild(elementoLabelCategoria);
      setCategoriaComida('');
    }

    if (tipoCategoria === 'comida') {
      divTipo.appendChild(labelCategoria);
      divTipo.appendChild(inputCategoria);
    }

    if (tipoCategoria === 'bebida') {
      divTipo.appendChild(radioAlcoolico);
      divTipo.appendChild(labelAlcoolico);
      divTipo.appendChild(radioNaoAlcoolico);
      divTipo.appendChild(labelNaoAlcoolico);
    }
  }

  function salvaReceita() {
    if (localStorage.getItem('newRecipes')) {
      const arrayReceitas = JSON.parse(localStorage.getItem('newRecipes'));
      const objNovaReceita = {
        type: tipo,
        category: categoriaComida,
        alcoholicOrNot: alcoolico,
        name: nomeReceita,
        image: imagem,
        instructions: modoPreparo,
        ingredients: ingredientes,
      };
      const newArrayRecipes = [
        ...arrayReceitas,
        objNovaReceita,
      ];
      localStorage.setItem('newRecipes', JSON.stringify(newArrayRecipes));
    } else {
      const objNovaReceita = [{
        type: tipo,
        category: categoriaComida,
        alcoholicOrNot: alcoolico,
        name: nomeReceita,
        image: imagem,
        instructions: modoPreparo,
        ingredients: ingredientes,
      }];
      localStorage.setItem('newRecipes', JSON.stringify(objNovaReceita));
    }
    history.push('/novas-receitas-salvas');
  }

  return (
    <div>
      <Header2 title="Nova Receita" />
      <form>
        <label htmlFor="nome-receita">
          {'Nome da Receita: '}
          <input
            id="nome-receita"
            type="text"
            onChange={ (e) => setNomeReceita(e.target.value) }
          />
        </label>
        <br />
        <br />
        <div id="div-tipo">
          <label>
            {'Tipo: '}
            <input
              id="comida"
              type="radio"
              value="comida"
              name="tipoReceita"
              onClick={ () => { setTipo('comida'); verificaTipo('comida'); } }
            />
            <label htmlFor="comida">
              Comida
            </label>
            <input
              id="bebida"
              type="radio"
              value="bebida"
              name="tipoReceita"
              onClick={ () => { setTipo('bebida'); verificaTipo('bebida'); } }
            />
            <label htmlFor="bebida">
              Bebida
            </label>
            <br />
            <br />
          </label>
        </div>
        <br />
        <fieldset id="fieldset-ingredientes">
          <legend>Ingredientes</legend>
          <label>{'Ingrediente 1: '}</label>
          <input
            className="ingrediente"
            type="text"
            onChange={ (e) => setIngredientes([e.target.value]) }
          />
          <br />
        </fieldset>
        <button
          type="button"
          onClick={ () => { novoIngrediente(); setCount(count + 1); } }
        >
          Novo Ingrediente
        </button>
        <br />
        <br />
        <fieldset>
          <legend>Modo de Preparo</legend>
          <textarea
            cols="30"
            rows="5"
            onChange={ (e) => setModoPreparo(e.target.value) }
          />
        </fieldset>
        <br />
        <br />
        <label htmlFor="imagem">
          {'Imagem da Receita: '}
        </label>
        <input
          id="imagem"
          type="img"
          alt="foto da receita"
          onChange={ (e) => setImagem(e.target.value) }
        />
      </form>
      <button type="submit" onClick={ () => salvaReceita() }>Salvar Receita</button>
      <br />
      <br />
      <a href="/novas-receitas-salvas">Ver Minhas Receitas</a>
    </div>
  );
}

export default NovaReceita;
