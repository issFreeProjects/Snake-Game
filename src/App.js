import './App.css';
import { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Canvas from './Components/Canvas/Canvas';
import GameOver from './Components/GameOver/GameOver';
import NavBar from './Components/NavBar/NavBar';



const [n,m]       = [10, 10];
const initPoint   = [0, 0];
const clockSpeed  = 100;   //refresh rate
const unitVectors = { up:[0,-1],     down:[0,1],        right:[1,0],         left:[-1,0] };
const arrowKeys   = { up: 'ArrowUp', down: 'ArrowDown', right: 'ArrowRight', left: 'ArrowLeft'};
var   timer_id    = -1;



function App() {
  const [dir,   setDir]         = useState( unitVectors.right );
  const [snake, setSnake]       = useState( [ mkRandPoint() ] );
  const [food, setFood]         = useState( mkRandPoint() );
  const [gameOver, setGameOver] = useState( false );
  const [isRuning, setIsRuning] = useState( true );



  useEffect(() => {
    if( isRuning === true && gameOver !== true )
    mkTimer();
    return () => clearTimeout(timer_id);
  });



  const mkTimer = ()=>{
    timer_id = setTimeout(
      () => {
          let newSnake = [...snake];
          newSnake.push( sumVectors( snake[snake.length-1] , dir ) );
          newSnake.shift();
          setSnake( newSnake );
      },clockSpeed);
  }



  const RUNpaly = () => {
    mkTimer();
    setIsRuning( true );
  }
  const PAUSEplay = () => {
    clearTimeout( timer_id );
    timer_id = -1;
    setIsRuning( false );
  }
  const toggle_play = () => {
      if( timer_id === -1 )
        RUNpaly();
      else PAUSEplay();
  }



  const keyDownHandler = ({ key }) => {
    if( key === arrowKeys.right ){
      if( isNewDirValid( unitVectors.left ) ) { setDir( unitVectors.right); setIsRuning(true); }
    }
    else if( key === arrowKeys.left ){
      if( isNewDirValid( unitVectors.right) ) { setDir( unitVectors.left);  setIsRuning(true); }
    }
    else if( key === arrowKeys.up ){ 
      if( isNewDirValid(unitVectors.down)   ) { setDir( unitVectors.up);    setIsRuning(true); }
    }
    else if( key === arrowKeys.down ){
      if( isNewDirValid(unitVectors.up)     ) { setDir( unitVectors.down);  setIsRuning(true); }
    }
    else if( key === 'p' )
      toggle_play();
  }



  const isNewDirValid = ( newDir ) => {
    return ( !isEQ( newDir , dir  ) || snake.length == 1 )
  }



  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    return ()=> window.removeEventListener('keydown', keyDownHandler);
  },[keyDownHandler])



  useEffect(() => {
    if( gameOver != true ){
      foodEaten();
      isContactOccur();
    }
  }, [snake])



  const foodEaten = () => {
    const lastS = snake[snake.length-1];
    if( lastS[0] == food[0] && lastS[1] == food[1] ){
      let newSnake = [...snake];
      newSnake.push( food );
      setSnake( newSnake );
      mkRandFood();
    }
  }



  const mkRandFood = () => {
      let point = mkRandPoint();
      snake.map( obj => {
        if( obj[0] === point[0] && obj[1] === point[1])
          point = sumVectors( snake[snake.length-1] , dir )
      })
      setFood( point );
  }



  const isContactOccur = () => {
    const lastS = snake[snake.length-1];
    if( snake.length > 4 ) // maybe contact
      for( let k=0; k<snake.length-3; k++)
        if( lastS[0] === snake[k][0]  &&  lastS[1] === snake[k][1] )
          onGameOver();
  }



  const onGameOver = () => {
    setGameOver( true )
    clearTimeout( timer_id )
  }



  const playAgain = () => {
    setSnake( [mkRandPoint()] );
    setFood( mkRandPoint() );
    setGameOver( false );
  }



  return (<>
    <NavBar rank={snake.length} isRuning={isRuning} toggleRuning={toggle_play} gameOver={gameOver} playAgain={playAgain}/>
    <Container style={{display:'flex',justifyContent: 'center', paddingTop: '40px'}}>
      <Row>
        <Col>
          {
            ( gameOver !== true ) ? ( <Canvas n={n} m={m} snake={snake} food={food} /> ) :
                    ( <GameOver playAgain={playAgain} /> )
          }
        </Col>
      </Row>
    </Container>
    </>
  );
}



function sumVectors( v1, v2 ){
  return [ realReminder(v1[0]+v2[0]) , realReminder(v1[1]+v2[1]) ];
}



function realReminder( x ){
  let r = x % 25;
  if( r<0 ) r += 25;
  return(r);
}



function mkRandPoint(){
  const x = Math.floor( Math.random()*20 + 1 );
  const y = Math.floor( Math.random()*20 + 1 );
  return( [x,y] );
}



function isEQ( v1, v2 ){
  return( v1[0]===v2[0] && v1[1]===v2[1] );
}
export default App;
