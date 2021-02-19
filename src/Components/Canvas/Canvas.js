import { useRef, useEffect, useState } from 'react';
import './Canvas.scss' 

function Canvas({ n, m, snake, food }){
    const canvasRef = useRef(null);
    const [lastRect, setLastRect] = useState(undefined);
    const [lastFood, setLastFood] = useState(undefined);
    useEffect(()=>{
        const context = canvasRef.current.getContext('2d')
        context.fillStyle = '#ccbbff';
        for( let i=0; i<snake.length; i++)
            context.fillRect( getRealPosition(snake[i][0]), getRealPosition(snake[i][1]), 17, 17)
        if( lastRect )
            context.clearRect( getRealPosition(lastRect[0]), getRealPosition(lastRect[1]), 17, 17);
        setLastRect( snake[0] );

    }, [snake])


    useEffect(() => {
        const context = canvasRef.current.getContext('2d')
        context.fillStyle = '#11bb55';
        context.fillRect( getRealPosition(food[0]), getRealPosition(food[1]), 17, 17);
        if( lastFood )
            context.clearRect( getRealPosition(lastFood[0]), getRealPosition(lastFood   [1]), 17, 17);
    }, [food]);

    return( <canvas className="back" width="501px" height="501ps" ref={canvasRef}/> );
}

function getRealPosition(xy){
    return( xy * 20 + 2 );
}

// display a single cell



export default Canvas;