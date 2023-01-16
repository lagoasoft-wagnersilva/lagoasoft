// COMPONENTS
import React from 'react';

// CSS
import './styleHeader.css';

export default function Suits() {
  return (
    <div className="flex flex-row space-x-1 ">
      <img src="https://cafecomtarot.com.br/wp-content/uploads/2021/05/espadas.png" alt="" className="suits_img" />
      <img src="https://cafecomtarot.com.br/wp-content/uploads/2021/05/copas.png" alt="" className="suits_img" />
      <img src="https://cafecomtarot.com.br/wp-content/uploads/2021/05/paus.png" alt="" className="suits_img" />
      <img src="https://cafecomtarot.com.br/wp-content/uploads/2021/05/ouros.png" alt="" className="suits_img" />
    </div>
  );
}
