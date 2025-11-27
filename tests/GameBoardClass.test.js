const Ship=require('../scripts/ShipClass');
const GameBoard=require('../scripts/GameBoardClass');




describe('GameBoard class',()=>{

    let gameBoard;

    beforeEach(()=>{
        gameBoard=new GameBoard();
    })

    test('creates empty gameBoard',()=>{
        expect(gameBoard.ships).toEqual([]);
        expect(gameBoard.missedAttacks).toEqual([]);

    })

    describe('placeShip',()=>{
        test('placeShip at specific coordinates',()=>{
            const ship=new Ship(3);
            gameBoard.placeShip(ship, 2, 3, 'horizontal');
            expect(gameBoard.ships).toContainEqual({
                ship,
                coordinates: [{x:2,y:3},{x:3,y:3},{x:4,y:3}]
            })

            
        })

        test('place vertical ship',()=>{
            const ship=new Ship(2);
            gameBoard.placeShip(ship,1,1,'vertical');

            expect(gameBoard.ships).toContainEqual({
                ship,
                coordinates:[{x:1,y:1},{x:1,y:2}]
            })
        })

        test('ship behind the board',()=>{
            const ship=new Ship(4);
            expect(()=>gameBoard.placeShip(ship,8,8,'horizontal'))
            .toThrow('Ship placement out of bounds');
        })
    })

    describe('recieveAttack',()=>{
        let ship;

        beforeEach(()=>{
            ship=new Ship(3);
            gameBoard.placeShip(ship, 2, 2, 'horizontal');
        })

        test('hits ship when attack hits coordinates',()=>{
            gameBoard.receiveAttack(2,2);
            expect(ship.hits).toBe(1);
        })

        test('records missing attack',()=>{
            gameBoard.receiveAttack(5,5);
            expect(gameBoard.missedAttacks).toContainEqual({x:5,y:5})
        })

        test('does not hit same coordinate twice',()=>{
            gameBoard.receiveAttack(2,2);
            gameBoard.receiveAttack(2,2);
            expect(ship.hits).toBe(1);
        })
    })


    describe('all ship sunk',()=>{
        test('returns false when not all ships are sunk',()=>{
            const ship1=new Ship(2);
            const ship2=new Ship(3);

            gameBoard.placeShip(ship1, 0, 0, 'horizontal');
            gameBoard.placeShip(ship2, 3, 3, 'vertical');

            ship1.hit();
            ship1.hit();

            expect(gameBoard.allShipsSunk()).toBe(false);

        })

        test('returns true when  all ships are sunk',()=>{
            const ship1=new Ship(2);
            const ship2=new Ship(1);

            gameBoard.placeShip(ship1, 0, 0, 'horizontal');
            gameBoard.placeShip(ship2, 3, 3, 'vertical');

            ship1.hit();
            ship1.hit();
            ship2.hit();

            expect(gameBoard.allShipsSunk()).toBe(true);

        })

        test('return true when no ships places',()=>{
            expect(gameBoard.allShipsSunk()).toBe(true);
        })
    })
})
