const GameBoard=require('./GameBoardClass');
const Ship = require('./ShipClass');

class Player{
    constructor(name,type='human'){
        this.name=name;
        this.type=type;
        this.gameBoard=new GameBoard();
        this.isTurn=false;
    }

    attack(enemyGameBoard,x,y){
        return enemyGameBoard.receiveAttack(x,y);
        
    }

    areAllShipsSunk(){
        return enemyGameBoard.allShipSunk();
    }
}

class HumanPlayer extends Player{
    constructor(name){
        super(name,'human');
    }

    makeAttack(enemyGameBoard,x,y){
        return this.attack(enemyGameBoard,x,y);

    }
}

class computerPlayer extends Player{
    constructor(){
        super('Computer','computer')
        this.avaibleMoves=this.generateAllMoves();
    }

    generateAllMoves(){
        const moves=[];

        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                moves.push({x,y});
            }
        }

        return moves;
    }

    makeAttack(enemyGameBoard){
        const index=Math.floor(Math.random()*this.avaibleMoves.length)

        const move=this.avaibleMoves.slice(index,1)[0];
        
        return {
            result: this.attack(enemyGameBoard,move.x,move.y),
            coordinates: move
        }
    }

    placeShipsRandomly(){
        const ships=[
            new Ship(5),
            new Ship(4),
            new Ship(3),
            new Ship(3),
            new Ship(2),
            
        ]

        ships.forEach(ship=>{
            let placed=false;
            while(!placed){
                try{
                    const x=Math.floor(Math.random()*10);
                    const y=Math.floor(Math.random()*10);

                    const direction=Math.random()>0.5?'horizontal':'vertical';

                    this.gameBoard.placeShip(ship,x,y,direction);

                    placed=true;
                }
                catch(error){
                }
            }
        })
    }
}



