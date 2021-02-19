import './GameOver.scss' 
import { Button } from 'react-bootstrap';

function GameOver({ playAgain }){

    return(<>
        <div className="backGO cen">
            <h1 className="h1" > Game Over!!! </h1> 
        </div>
        <Button onClick={playAgain} variant="outline-danger"  onClick={playAgain} block>play Again</Button>;
    </>)
}


export default GameOver;