import "../App.css"

import React, { useState } from "react"
import { calc } from '../utils/calc'
import { Buttons } from './botoes'

interface IHistory {
    operation: string
    result: number
    time?: string
}

export function Calculator() {

    const [isOperating, setIsOperating] = useState<boolean>(false)
    const [history, setHistory] = useState<IHistory[]>([])
    const [newOperation, setNewOperation] = useState<boolean>(true)
    const [notUsedDot, setNotUsedDot] = useState<boolean>(true)
    const fn = (e: any) => calc(e, {isOperating, setIsOperating, history, setHistory, newOperation, setNewOperation, notUsedDot, setNotUsedDot})

    return (
        <div className="box">
            <div className="container">
                <form className="calculator" name="calc" >
                    <input className="display" type="text" name="txt" readOnly={true} />
                    <Buttons fn={fn} />
                </form>
            </div>
        </div>
    )
}