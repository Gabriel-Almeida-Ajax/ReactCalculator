interface IHistory {
  operation: string
  result: number
  time?: string
}
interface IUtils {
  isOperating: boolean,
  setIsOperating: React.Dispatch<React.SetStateAction<boolean>>,
  history: IHistory[],
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>,
  newOperation: boolean,
  setNewOperation: React.Dispatch<React.SetStateAction<boolean>>,
  notUsedDot: boolean,
  setNotUsedDot: React.Dispatch<React.SetStateAction<boolean>>
}

export const calc = (e: any, utils: IUtils): any => {

  const fnOp = (e: any, msm: any) => {
    e.target.parentElement[0].value += e.target.innerText
    utils.setIsOperating(true)
    utils.setNotUsedDot(true)
    console.log(msm, e.target.innerText)
  }

  const operations: any = {
    '+'(e: any) {
      fnOp(e, '> Sum')
    },
    '-'(e: any) {
      fnOp(e, '> Subtraction')
    },
    '*'(e: any) {
      fnOp(e, '> Multiplication')
    },
    '/'(e: any) {
      fnOp(e, '> Division')
    },
    'AC'(e: any) {
      e.target.parentElement[0].value = '0'
      console.log('> Clear', e.target.innerText)
      utils.setIsOperating(false)
      utils.setNotUsedDot(true)
    },
    '='(e: any) {

      let value = eval(e.target.parentElement[0].value) || false
      if (value) {
        let hys = utils.history
        hys.push({ operation: e.target.parentElement[0].value, result: value, time: new Date().toLocaleString('PT-br') })
        utils.setHistory(hys)

        e.target.parentElement[0].value = value
        utils.setNewOperation(true)
        utils.setNotUsedDot(true)
        console.log('> Calc', e.target.innerText)
      }
    },
    'H'() {
      console.log(utils.history)
    },
  }

  const thatkeyIsOperation = (e: any) => new RegExp("(operation)", "u").test(e.target.classList.value)

  const notIsGetResult = (e: any) => e.target.innerText !== '=' ? true : false

  const thatKeyNotIsOperation = (e: any) => true

  const valueInCalculator = e.target.parentElement[0].value

  interface IPropsCalc {
    value: string
    operation?: boolean
    newOperation?: boolean
    notUsedDot?: boolean
  }

  const setValue = (props: IPropsCalc): void => {
    e.target.parentElement[0].value = props.value
    utils.setIsOperating(props.operation || false)
    utils.setNewOperation(props.newOperation || false)
    utils.setNotUsedDot(props.notUsedDot || utils.notUsedDot)
  }
  const addValue = (props: IPropsCalc): void => {
    e.target.parentElement[0].value += props.value
    utils.setIsOperating(props.operation || false)
    utils.setNewOperation(props.newOperation || false)
    utils.setNotUsedDot(props.notUsedDot || utils.notUsedDot)
  }

  const isNewOperation = utils.newOperation === true
  const isOperation = utils.isOperating === true
  const valueInCalculatorNotIsZero = valueInCalculator !== '0'
  const valueInCalculatorIsZero = valueInCalculator === '0'
  const insertValueIsDot = e.target.innerText === '.'
  const insertValueIsZero = e.target.innerText !== '0'

  if (thatkeyIsOperation(e)) {
    // Se for operação, ele entra nas tratativas de operação


    if (!utils.isOperating) {
      // Se não estiver em uma Operação ele adicina a operação
      operations[e.target.innerText](e)

    } else if (notIsGetResult(e)) {
      // Se for Operação ele substitui a operação

      let txt = e.target.parentElement[0].value
      e.target.parentElement[0].value = txt.substr(0, (txt.length - 1))
      operations[e.target.innerText](e)

    }

  } else if (thatKeyNotIsOperation(e)) {
    // Se não for operação, e for numero, ele entra nas tratativas de numero
    if (valueInCalculatorIsZero && insertValueIsZero) {
      // Se a calculadora conter apenas o valor 0, e tentar inserir um valor diferente de outro 0 ele substitui e fica aberto para colocar operações
      if (insertValueIsDot) {
        setValue({ value: `0${e.target.innerText}` });

      } else {
        setValue({ value: e.target.innerText });

      }

    }
    else if (valueInCalculatorNotIsZero) {
      // Se a calculadora não conter apenas o valor 0, ele adiciona e fica aberto para colocar operações
      // TODO: PRECISO TRATAR O ERRO DOS PONTOS, ELE DEIXA COLOCAR MAIS DE UM PONTO PARA CASA DECIMAIS
      if (utils.isOperating && insertValueIsDot) {
        addValue({ value: `0${e.target.innerText}` });

      } else if (isNewOperation) {
        if (insertValueIsDot) {
          setValue({ value: `0${e.target.innerText}` });

        } else {
          if (isOperation && isNewOperation) {
            addValue({ value: e.target.innerText });

          } else {
            setValue({ value: e.target.innerText });

          }
        }
      } else {
        if (insertValueIsDot && utils.notUsedDot) {
          addValue({ value: e.target.innerText, notUsedDot: false });
          console.log(e.target.innerText)
        } else {
          addValue({ value: e.target.innerText });
        }

      }
    }
  }
}