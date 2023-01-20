/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React, { useEffect, useState } from 'react';
import './styleBody.css';
import axios from 'axios';
import { render } from '@testing-library/react';

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
// ||
// const [step, setStep] = useState({
//   step0: [], step1: [], step2: [], step3: [],
// });

function Gaming({ setMode }) {
  // Armazena o Dek de cartas com 52
  const [deck, setDeck] = useState({});
  // Armazena as 21 cartas retiradas do do deck de 52
  const [cards, setCards] = useState([]);
  // Armazena as as pilhas de 7 cartas retiradas das 21
  const [pile, setPile] = useState({ pile1: [], pile2: [], pile3: [] });
  // Armazena em qual step o game está

  const [gameMode, setGameMode] = useState('STEP0');

  const GAMEMODE = {
    STEP0: gameStep0,
    STEP1: gameStep1,
    STEP2: gameStep2,
    STEP3: gameStep3,
  };

  const RenderGameMode = GAMEMODE[gameMode] || (() => (
    <div className="flex flex-col items-center">
      <h1>ERROR</h1>
      <h3>Please, restart the game</h3>
      <button type="button" className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => setMode('HOME')}>Restart</button>
    </div>
  ));

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

  // function gameError() {
  //   return (
  //     <div />
  //   );
  // }

  function gameStep0({ setGameMode }) {
    return (
      <div className="flex flex-col items-center">
        <h1>Game Step 0</h1>
        <button type="button" className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => (setGameMode('STEP1'))}>Start Game</button>
        <div className="cardContent flex flex-row justify-center">
          {cards.map((card) => <img className="CardStart" src={card.image} key={card.image} alt="card" />)}
        </div>
      </div>
    );
  }

  function gameStep1({ setGameMode }) {
    return (
      <div className="flex flex-col items-center flex-nowrap">
        <h1>Game Step 1</h1>
        <div>
          <div>
            <button type="button" className="gameCards pile0" onClick={() => (setGameMode('STEP2'))}>
              {pile.pile1.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button type="button" className=" gameCards pile1 mx-16" onClick={() => (setGameMode('STEP2'))}>
              {pile.pile2.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button type="button" className="gameCards pile2" onClick={() => (setGameMode('STEP2'))}>
              {pile.pile3.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>
          </div>
        </div>
      </div>

    );
  }
  function gameStep2({ setGameMode }) {
    return (
      <div className="flex flex-col items-center">
        <h1>Game Step 2</h1>
        <div>
          <div>
            <button type="button" className="gameCards pile0" onClick={() => (setGameMode('STEP3'))}>
              {pile.pile1.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button type="button" className=" gameCards pile1 mx-16" onClick={() => (setGameMode('STEP3'))}>
              {pile.pile2.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button type="button" className="gameCards pile2" onClick={() => (setGameMode('STEP3'))}>
              {pile.pile3.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>
          </div>
        </div>
      </div>
    );
  }
  function gameStep3({ setGameMode }) {
    return (

      <div className="flex flex-col items-center">
        <h1>Game Step 3</h1>
        <h1>CARTA ESCOLHIDA VAI AQUI</h1>
        <button className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="button" onClick={() => setMode('HOME')}>Restart Game</button>
      </div>

    );
  }

  return (
    <div id="1">
      <div className="flex flex-col items-center">
        <h1>Gaming</h1>
      </div>
      <div>
        <RenderGameMode setGameMode={setGameMode} />

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
    <div className="flex bg-white flex-col p-8 rounded flex ">
      <RenderMode setMode={setMode} />
    </div>
  );
}
