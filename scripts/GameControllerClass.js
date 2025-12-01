import {HumanPlayer,computerPlayer, } from "./PlayerClass";


class GameController{
    constructor(){
        this.players=[];
        this.currentPlayerIndex=0;
        this.gameOver=false;
    }

    itializeGame(){
        this.players=[
            new HumanPlayer('Player 1'),
            new computerPlayer(),
        ];

        this.players[1].placeShipsRandomly();

        this.currentPlayerIndex=0;
        this.gameOver=false;
    }

    get currentPlayer(){
        return this.players[this.currentPlayerIndex];
    }

    get enemyPlayer(){
        return this.players[1-this.currentPlayerIndex];
    }

    playHumanTurn(x,y){
        if(this.gameOver && this.CurrentPlayer.type!=='human') return;

        const result=this.currentPlayer.makeAttack(this.enemyPlayer.gameBoard, x,y);
        if(result!=='already attacked'){
            this.checkGameOver();
            if(!this.gameOver){
                this.switchTurns();
                this.playComputerTurn();
            }
        }

        return result;
    }

    playComputerTurn(){
        if(this.gameOver && this.currentPlayer!=='computer') return;

        setTimeout(()=>{
            const {result, coordinates}=this.currentPlayer.makeAttack(this.enemyPlayer.gameBoard)
            this.checkGameOver();

            if(!this.gameOver){
                this.switchTurns();
    
            }

            this.onComputerAttack?.(coordinates, result);
        },1000)

    }

    switchTurns(){
        this.currentPlayerIndex=1-this.currentPlayerIndex;
    }

    checkGameOver(){
        if(this.enemyPlayer.areAllShipsSunk()){
            this.gameOver=true;
            this.onGameOver?.(this.currentPlayer);
        }
    }
    setCallbacks({onComputerAttack,onGameOver}){
        this.onComputerAttack=onComputerAttack;
        this.onGameOver=onGameOver;
    }


}