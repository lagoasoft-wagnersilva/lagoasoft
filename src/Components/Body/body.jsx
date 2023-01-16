/* eslint-disable no-console */
/* eslint no-console: "error" */

import React, { useEffect, useState } from 'react';
import './styleBody.css';
import axios from 'axios';

// useState = ESTADO DAS COISAS

// useEffect = EFEITOS COLATERAIS

// useMemo e useCallback = OTIMIZAÇÃO

function Home({ setMode }) {
  return (
    <div className="flex flex-col items-center">
      <h1>HOME</h1>
      <button className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="button" onClick={() => setMode('GAMING')}>LETS PLAY</button>
    </div>
  );
}

function Gaming({ setMode }) {
  // TRABALHO: PEGAR AS CARTAS E DIVIDIR EM 3 PILHAS
  // const [piles, setPiles] = useState({ pile1: [], pile2: [], pile3: [] });

  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [pile, setPile] = useState({ pile1: [], pile2: [], pile3: [] });

  // Pega um baralho interro com 52 cartas
  const getDeck = async () => {
    const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    setDeck(response.data);
  };
  // Pega apenas 21 cartas do baralho pego acima
  const getCards = async () => {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=23`);
    setCards(response.data.cards);
  };
  // Divide o baralho em 3 pilhas
  const getPile = async () => {
    setPile({ pile1: cards.slice(0, 7), pile2: cards.slice(8, 15), pile3: cards.slice(16, 23) });
    console.log(pile);
    console.log(cards);
  };

  useEffect(() => {
    getDeck().then();
  }, []);
  useEffect(() => {
    if (deck) {
      getCards().then();
    }
  }, [deck]);

  useEffect(() => {
    if (cards) {
      getPile().then();
    }
  }, [cards]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1>Gaming</h1>
        <button className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="button" onClick={() => setMode('RESULT')}>LETS PLAY</button>
      </div>
      <div className="flex flex-row justify-center ">
        <div>
          <button type="button" className="gameCards">
            {pile.pile1.map((card) => <img src={card.image} key={card.image} alt="card" />)}
          </button>

          <button type="button" className=" gameCards mx-16 ">
            {pile.pile2.map((card) => <img src={card.image} key={card.image} alt="card" />)}
          </button>

          <button type="button" className="gameCards">
            {pile.pile3.map((card) => <img src={card.image} key={card.image} alt="card" />)}
          </button>
        </div>
      </div>
    </div>
  );
}

function Result({ setMode }) {
  // MOSTRAR RESULTADO
  return (
    <div className="flex flex-col items-center">
      Result
      <button className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="button" onClick={() => setMode('HOME')}>Restart Game</button>
    </div>
  );
}

const MODES = {
  HOME: Home,
  GAMING: Gaming,
  RESULT: Result,
};

export default function Game() {
  const [mode, setMode] = useState('HOME');
  const RenderMode = MODES[mode] || (() => (
    <div className="flex flex-col items-center">
      <h1>ERROR</h1>
      <h3>Please, restart the game</h3>
      <button type="button" className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => setMode('HOME')}>Restart</button>
    </div>
  )
  );
  return (
    <div className="bg-white flex-col p-8 rounded flex max-w-full">
      <RenderMode setMode={setMode} />
    </div>
  );
}
