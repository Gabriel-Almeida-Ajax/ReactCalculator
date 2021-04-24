import React, { useState } from "react"
import { calc } from './utils/calc'

import "./App.css"
interface IHistory {
  operation: string
  result: number
  time?: string
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
            <span className="btn operation ac" onClick={fn}>AC</span>
            <span className="btn operation" onClick={fn}>-</span> 
            <span className="btn operation equal-sign" onClick={fn}>=</span>
            <span className="btn operation" onClick={fn}>+</span>
            <span className="btn operation" onClick={fn}>/</span>
            <span className="btn num" onClick={fn}>7</span>
            <span className="btn num" onClick={fn}>8</span>
            <span className="btn num" onClick={fn}>9</span>
            <span className="btn operation" onClick={fn}>*</span>
            <span className="btn num" onClick={fn}>4</span>
            <span className="btn num" onClick={fn}>5</span>
            <span className="btn num" onClick={fn}>6</span>
            <span className="btn num" onClick={fn}>1</span>
            <span className="btn num" onClick={fn}>2</span>
            <span className="btn num" onClick={fn}>3</span>
            <span className="btn operation" onClick={fn}>H</span>
            <span className="btn num" onClick={fn}>0</span>
            <span className="btn num" onClick={fn}>.</span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
