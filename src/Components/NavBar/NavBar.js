import {Navbar, Button, Badge, Nav} from 'react-bootstrap';

function NavBar( { rank, isRuning, toggleRuning, gameOver, playAgain } ){

    const mkScore = () => {
        if( gameOver !== true )
          return (<h5><Badge pill variant="secondary">Rank: {rank}</Badge></h5>);
        else
          return (<h5><Badge variant="danger">Rank: {rank}</Badge></h5>);
    }


    const mkButton = () => {
        if( gameOver !== true )
            if( isRuning === true )
                return <Button onClick={toggleRuning} variant="outline-danger" >pause</Button>;
            else
                return <Button onClick={toggleRuning} variant="outline-success" >play</Button>;
        else return <Button onClick={playAgain} variant="outline-primary" >play Again</Button>;
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand >Snake Game! </Navbar.Brand>
            <Nav className="mr-auto">
                { mkScore() }
            </Nav>
            <Nav> {mkButton()} </Nav>
        </Navbar>
    );
}

export default NavBar;