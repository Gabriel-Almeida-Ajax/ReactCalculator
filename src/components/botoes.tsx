import React from 'react';

export const Buttons: React.FC<any> = ({ fn }) => {
    const btns = [
      { "AC": "btn operation ac" },
      { "-": "btn operation" },
      { "=": "btn operation equal-sign" },
      { "+": "btn operation" },
      { "/": "btn operation" },
      { "7": "btn num" },
      { "8": "btn num" },
      { "9": "btn num" },
      { "*": "btn operation" },
      { "4": "btn num" },
      { "5": "btn num" },
      { "6": "btn num" },
      { "1": "btn num" },
      { "2": "btn num" },
      { "3": "btn num" },
      { "H": "btn operation" },
      { "0": "btn num" },
      { ".": "btn num" },
    ]
  
    const Button: React.FC<any> = (btn) => {
      let name = Object.keys(btn)
      return (<span key={name[0]} className={btn[name[0]]} onClick={fn}>{name}</span>)
    }
  
    return (
      <>
        { btns.map(Button) }
      </>
    )
  }