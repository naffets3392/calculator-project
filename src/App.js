import { useReducer } from 'react';
import './App.css';

const DISPATCH_ACTIONS = {
  ADD_NUMBER: 'add_number',
  ADD_SIGN: 'add_sign',
  DELETE_NUMBER: 'delete_number',
  ALL_CLEAR: 'all_clear',
  EQUAL: 'equal'
}

function calcFunc(calcObj,action) {
  switch(action.type) {
    case DISPATCH_ACTIONS.ADD_SIGN:
      if(!calcObj.currentNum) {
        return calcObj
      } else if (calcObj.currentNum && calcObj.prevNum && calcObj.sign){
        const prevNumber = parseInt(calcObj.prevNum)
        const currentNumber = parseInt(calcObj.currentNum)
        switch(calcObj.sign) {
          case '+':
          return {prevNum: prevNumber + currentNumber, currentNum: '', sign: action.payload};
          case '-':
            return {prevNum: prevNumber - currentNumber, currentNum: '', sign: action.payload};
          case '/':
            return {prevNum: prevNumber / currentNumber, currentNum: '', sign: action.payload};
          case '*':
            return {prevNum: prevNumber * currentNumber, currentNum: '', sign: action.payload};
        }
      } else if (calcObj.prevNum && !calcObj.currentNum){
        return {prevNum: '', currentNum: calcObj.prevNum, sign: action.payload}
      }
      return {prevNum: calcObj.currentNum, currentNum: '', sign: action.payload};
    case DISPATCH_ACTIONS.ADD_NUMBER:
      if(calcObj.currentNum.includes('.') && action.payload === '.') {
        return calcObj
      }
      return {...calcObj, currentNum: calcObj.currentNum + action.payload};
    case DISPATCH_ACTIONS.DELETE_NUMBER:
      return {...calcObj, currentNum: calcObj.currentNum.slice(0,calcObj.currentNum.length - 1)};
    case DISPATCH_ACTIONS.ALL_CLEAR:
      return {prevNum: '',currentNum: '',sign: ''}   
    case DISPATCH_ACTIONS.EQUAL:
      if(calcObj.prevNum && calcObj.currentNum && calcObj.sign) {
        const prevNumber = parseFloat(calcObj.prevNum)
        const currentNumber = parseFloat(calcObj.currentNum)

        console.log(currentNumber)
        switch(calcObj.sign) {
          case '+':
          return {prevNum: '', currentNum: (prevNumber + currentNumber).toString(), sign: ''};
          case '-':
            return {prevNum: '', currentNum: (prevNumber - currentNumber).toString(), sign: ''};
          case '/':
            return {prevNum: '', currentNum: (prevNumber / currentNumber).toString(), sign: ''};
          case '*':
            return {prevNum: '', currentNum: (prevNumber * currentNumber).toString(), sign: ''};
        }
      } else {
        return calcObj
      }   
    }
}

function App() {
  const [calcObj,dispatch] = useReducer(calcFunc,{prevNum: '',currentNum: '', sign: ''})

  return (
    <div className="App">
      <div className='span-all'>
        <p className='prev-number'>{`${calcObj.prevNum}${calcObj.sign}`}</p>
        <p className='current-number'>{calcObj.currentNum}</p>
      </div>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ALL_CLEAR})} className='sign span2'>AC</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.DELETE_NUMBER})} className='sign'>DEL</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_SIGN, payload: '/'})} className='sign'>/</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 1})} className='number'>1</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 2})} className='number'>2</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 3})} className='number'>3</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_SIGN, payload: '*'})} className='sign'>*</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 4})} className='number'>4</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 5})} className='number'>5</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 6})} className='number'>6</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_SIGN, payload: '+'})} className='sign'>+</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 7})} className='numebr'>7</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 8})} className='number'>8</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 9})} className='number'>9</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_SIGN, payload: '-'})} className='sign'>-</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: '.'})} className='number'>.</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.ADD_NUMBER, payload: 0})} className='number'>0</button>
      <button onClick={() => dispatch({type: DISPATCH_ACTIONS.EQUAL})} className='sign span2'>=</button>
    </div>
  );
}

export default App;
