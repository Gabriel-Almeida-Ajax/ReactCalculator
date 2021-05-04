import React, { useState } from "react"
import { calc } from './utils/calc'

import "./App.css"
interface IHistory {
  operation: string
  result: number
  time?: string
}


const Buttons: React.FC<any> = ({ fn }) => {
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
    return (<span className={btn[name[0]]} onClick={fn}>{name}</span>)
  }

  return (
    <>
      { btns.map(Button) }
    </>
  )
}

function App() {

  const [isOperating, setIsOperating] = useState<boolean>(false)
  const [history, setHistory] = useState<IHistory[]>([])
  const [newOperation, setNewOperation] = useState<boolean>(true)
  const fn = (e: any) => calc(e, { isOperating, setIsOperating, history, setHistory, newOperation, setNewOperation })

  return (
    <div className="App">
      <div className="box">
        <div className="container">
          <form className="calculator" name="calc" >
            <input className="display" type="text" name="txt" readOnly={true} />
            <Buttons fn={fn} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default App