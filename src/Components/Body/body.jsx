import React, { useEffect, useState } from 'react';
import './styleBody.css';
import axios from 'axios';

function Home({ setMode }) {
  return (
    <div className="flex flex-col items-center">
      <button className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 duration-300" type="button" onClick={() => setMode('GAMING')}>START THE MAGIC!!</button>
    </div>
  );
}

// XXX WAGNER: o ideal seria colocar as funções getDeck, getCards, getPile, redistributeCards e onClickPile
// dentro de um useCallback para melhorar o re-render do app.

// XXX WAGNER: os components gameStep0, gameStep1, gameStep2, gameStep3, gameStep4
// poderiam ser criados fora do corpo do componente Gaming e receber o que precisam por props
// especialmente o 1, 2 e 3 que são basicamente o mesmo.

// XXX WAGNER: os MODES poderiam ser melhorados e serem rotas separadas com react-router por exemplo.
// Inclusive o modo de error.

// XXX WAGNER: já que durante o jogo usa apenas o pile e o setPile os estados de deck e cards poderiam sumir e no primeiro effect já 
// fazer os 3 async em sequencia
/*
  useEffect(() => {
       (async() => {
    const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const deckId = deck.data.deck_id
    const cards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=21`);
    setPile({ pile1: cards.data.slice(0, 7), pile2: cards.data.slice(7, 14), pile3: cards.data.slice(14, 21) });
       })()
  }, [cards]);
*/

// XXX WAGNER: Seria legal colocar um loader ou spinner na tela enquanto rola esse async.

// XXX WAGNER: esse Result nem é usado né? poderia apagar.

function Gaming({ setMode }) {
  // Armazena o Dek de cartas com 52
  const [deck, setDeck] = useState(null);
  // Armazena as 21 cartas retiradas do do deck de 52
  const [cards, setCards] = useState([]);
  // Armazena as as pilhas de 7 cartas retiradas das 21
  const [pile, setPile] = useState({ pile1: [], pile2: [], pile3: [] });
  // Armazena em qual step o game está

  const [gameMode, setGameMode] = useState('STEP0');

  // Pega um baralho interro com 52 cartas
  const getDeck = async () => {
    const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    setDeck(response.data);
  };
  // Pega apenas 21 cartas do baralho pego acima
  const getCards = async () => {
    if (deck.deck_id) {
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=21`);
      setCards(response.data.cards);
    }
  };
  // Divide o baralho em 3 pilhas
  const getPile = () => {
    setPile({ pile1: cards.slice(0, 7), pile2: cards.slice(7, 14), pile3: cards.slice(14, 21) });
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
      getPile();
    }
  }, [cards]);

  function redistributeCards() {
    const nextPositions = {
      0: 0,
      1: 7,
      2: 14,
      3: 1,
      4: 8,
      5: 15,
      6: 2,
      7: 9,
      8: 16,
      9: 3,
      10: 10,
      11: 17,
      12: 4,
      13: 11,
      14: 18,
      15: 5,
      16: 12,
      17: 19,
      18: 6,
      19: 13,
      20: 20,
    };

    setPile((prevState) => {
      const newCards = [];
      const allCards = [...prevState.pile1, ...prevState.pile2, ...prevState.pile3];
      allCards.forEach((card, index) => {
        newCards[nextPositions[index]] = card;
      });
      return {
        pile1: newCards.slice(0, 7),
        pile2: newCards.slice(7, 14),
        pile3: newCards.slice(14, 21),
      };
    });
  }

  function onClickPile(selectedPile) {
    if (selectedPile === 'pile1') {
      setPile((prevState) => ({
        pile1: prevState.pile3,
        pile2: prevState.pile1,
        pile3: prevState.pile2,
      }));
    } else if (selectedPile === 'pile2') {
      setPile((prevState) => ({
        pile1: prevState.pile3,
        pile2: prevState.pile2,
        pile3: prevState.pile1,
      }));
    } else {
      setPile((prevState) => ({
        pile1: prevState.pile2,
        pile2: prevState.pile3,
        pile3: prevState.pile1,
      }));
    }
    redistributeCards();
  }

  function gameStep0() {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text_main">Memorize Your Card And Start Game </h1>
        <div className="cardContent flex flex-row justify-center">
          {cards.map((card) => <img className="CardStart" src={card.image} key={card.image} alt="card" />)}
        </div>
        <button type="button" className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 duration-300" onClick={() => (setGameMode('STEP1'))}>Start Game</button>
      </div>
    );
  }

  function gameStep1() {
    return (
      <div className="flex flex-col items-center flex-nowrap">
        <h1 className="text_main">Which pile is your card in?</h1>
        <div>
          <div>
            <button
              type="button"
              className="gameCards pile0"
              onClick={() => {
                onClickPile('pile1');
                setGameMode('STEP2');
              }}
            >
              {pile.pile1.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button
              type="button"
              className=" gameCards pile1 mx-16"
              onClick={() => {
                onClickPile('pile2');
                setGameMode('STEP2');
              }}
            >
              {pile.pile2.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button
              type="button"
              className="gameCards pile2"
              onClick={() => {
                onClickPile('pile3');
                (setGameMode('STEP2'));
              }}
            >
              {pile.pile3.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>
          </div>
        </div>
      </div>

    );
  }
  function gameStep2() {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text_main">Which pile is your card in?</h1>
        <div>
          <div>
            <button
              type="button"
              className="gameCards pile0"
              onClick={() => {
                onClickPile('pile1');

                (setGameMode('STEP3'));
              }}
            >
              {pile.pile1.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button
              type="button"
              className=" gameCards pile1 mx-16"
              onClick={() => {
                onClickPile('pile2');

                (setGameMode('STEP3'));
              }}
            >
              {pile.pile2.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button
              type="button"
              className="gameCards pile2"
              onClick={() => {
                onClickPile('pile3');

                (setGameMode('STEP3'));
              }}
            >
              {pile.pile3.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>
          </div>
        </div>
      </div>
    );
  }
  function gameStep3() {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text_main">Which pile is your card in?</h1>
        <div>
          <div>
            <button
              type="button"
              className="gameCards pile0"
              onClick={() => {
                onClickPile('pile1');

                (setGameMode('STEP4'));
              }}
            >
              {pile.pile1.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button
              type="button"
              className=" gameCards pile1 mx-16"
              onClick={() => {
                onClickPile('pile2');

                (setGameMode('STEP4'));
              }}
            >
              {pile.pile2.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>

            <button
              type="button"
              className="gameCards pile2"
              onClick={() => {
                onClickPile('pile3');

                (setGameMode('STEP4'));
              }}
            >
              {pile.pile3.map((card) => <img className="Card" src={card.image} key={card.image} alt="card" />)}
            </button>
          </div>
        </div>
      </div>
    );
  }
  function gameStep4() {
    const allCards = [...pile.pile1, ...pile.pile2, ...pile.pile3];

    const chooseCards = allCards[10];
    return (

      <div className="flex flex-col items-center">
        <h1 className="text_main">Is this your card?</h1>
        <img className="p-9" src={chooseCards.image} alt="choosed card" />
        <button className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 duration-300" type="button" onClick={() => setMode('HOME')}>Restart Game</button>
      </div>

    );
  }
  const GAMEMODE = {
    STEP0: gameStep0,
    STEP1: gameStep1,
    STEP2: gameStep2,
    STEP3: gameStep3,
    STEP4: gameStep4,
  };
  const RenderGameMode = GAMEMODE[gameMode] || (() => (
    <div className="flex flex-col items-center">
      <h1 className="text_main">ERROR</h1>
      <h3 className="text_main">Please, restart the game</h3>
      <button type="button" className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 duration-300" onClick={() => setMode('HOME')}>Restart</button>
    </div>
  ));
  return (
    <div id="1">
      <div className="flex flex-col items-center" />
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
      <button className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 duration-300" type="button" onClick={() => setMode('HOME')}>Restart Game</button>
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
      <h1 className="text_main">ERROR</h1>
      <h3 className="text_main">Please, restart the game</h3>
      <button type="button" className="p-2 w-1/3 rounded transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 duration-300" onClick={() => setMode('HOME')}>Restart</button>
    </div>
  )
  );
  return (
    <div className="flex flex-col p-8 rounded flex ">
      <RenderMode setMode={setMode} />
    </div>
  );
}
