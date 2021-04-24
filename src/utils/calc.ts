export const calc = (e: any, utils?: any): any => {

  const fnOp = (e: any, msm: any) => {
    e.target.parentElement[0].value += e.target.innerText
    utils.setIsOperating(true)
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
    },
    '='(e: any) {

      let value = eval(e.target.parentElement[0].value) || false
      if (value) {
        let hys = utils.history
        hys.push({ operation: e.target.parentElement[0].value, result: value, time: new Date().toLocaleString('PT-br') })
        utils.setHistory(hys)

        e.target.parentElement[0].value = value
        utils.setNewOperation(true)
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

    if (valueInCalculator === '0' && e.target.innerText !== '0') {
      // Se a calculadora conter apenas o valor 0, e tentar inserir um valor diferente de outro 0 ele substitui e fica aberto para colocar operações

      if (e.target.innerText === '.') {
        e.target.parentElement[0].value = `0${e.target.innerText}`
        utils.setIsOperating(false)
        utils.setNewOperation(false)
      } else {
        e.target.parentElement[0].value = e.target.innerText
        utils.setNewOperation(false)
        utils.setIsOperating(false)
      }
    }
    else if (valueInCalculator !== '0') {
      // Se a calculadora não conter apenas o valor 0, ele adiciona e fica aberto para colocar operações


      // TODO: PRECISO TRATAR O ERRO DOS PONTOS, ELE DEIXA COLOCAR MAIS DE UM PONTO PARA CASA DECIMAIS
      if (utils.isOperating && e.target.innerText === '.') {
        e.target.parentElement[0].value += `0${e.target.innerText}`
        utils.setIsOperating(false)
        utils.setNewOperation(false)

      } else if (utils.newOperation) {
        if (e.target.innerText === '.') {
          e.target.parentElement[0].value = `0${e.target.innerText}`
          utils.setIsOperating(false)
          utils.setNewOperation(false)
        } else {
          console.log(utils.isOperating, utils.newOperation)

          if (utils.isOperating && utils.newOperation) {
            e.target.parentElement[0].value += e.target.innerText
          } else {
            e.target.parentElement[0].value = e.target.innerText
          }

          utils.setIsOperating(false)
          utils.setNewOperation(false)
        }

      } else {
        e.target.parentElement[0].value += e.target.innerText
        utils.setIsOperating(false)
        utils.setNewOperation(false)
      }
    }
  }
}