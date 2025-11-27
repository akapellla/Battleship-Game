class GameBoard{
    constructor(){
        this.ships=[];
        this.missedAttacks=[];
        this.boardSize=10;
    }

    placeShip(ship,startX,startY,direction){
        const coordinates=this.calculateShipCoordinates(ship.length,startX,startY,direction);

        if(!this.isValidPlacement(coordinates)){
            throw new Error('Ship placement out of bounds')
        }

        if(this.hasShipAt(coordinates)){
            throw new Error('Ship placement overlaps with existing ship')
        }

        this.ships.push({
            ship,
            coordinates
        });

    }


    calculateShipCoordinates(length,startX,startY,direction){
        const coordinates=[];
        
        for(let i=0;i<length;i++){
            if(direction==='horizontal'){
                coordinates.push({x:startX+i,y:startY})
            }
            else{
                coordinates.push({x:startX,y:startY+i})
            }
        }

        return coordinates;
    }

    isValidPlacement(coordinates){
        return coordinates.every(
            cord=>cord.x>=0 && cord.y>=0 && cord.x<=this.boardSize && cord.y<=this.boardSize
            );
    }

    hasShipAt(coordinates){
        return this.ships.some(shipData=>{
            shipData.coordinates.some(shipCoord=>
                coordinates.some(newCoord=>
                    shipCoord.x===newCoord.x && shipCoord.y=== newCoord.y
                )
            )
        })
    }

    receiveAttack(x,y){
        if(this.isAlreadyAttacked(x,y)){
            return 'already attacked';
        }
        const shipData=this.findShipAt(x,y);

        if(shipData){
            shipData.ship.hit();
            return 'hit';
        }
        else{
            this.missedAttacks.push({x,y});
            return 'miss';
        }
    }

    isAlreadyAttacked(x,y){
        const wasMissed=this.missedAttacks.some(coord=>coord.x===x && coord.y===y);
        const wasHit= this.ships.some(shipData=>
            shipData.coordinates.some(coord=>coord.x===x && coord.y===y)&& shipData.ship.hits>0
        );
        return wasMissed || wasHit;
    }

    findShipAt(x,y){
        return this.ships.find(shipData=>
            shipData.coordinates.some(coord=>coord.x===x && coord.y===y))
    }

    allShipsSunk(){
        if(this.ships.length===0) return true;
        return this.ships.every(shipData=>shipData.ship.isSunk());
    }

}

module.exports=GameBoard;

