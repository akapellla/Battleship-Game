
let Ship=require('../scripts/ShipClass')

describe('ShipClass isSunk function',()=>{

    

    test('sunk to true',()=>{
        let titanik=new Ship(3);
        titanik.hit();
        titanik.hit();
        titanik.hit();
        expect(titanik.isSunk()).toBeTruthy();
    })

    test('sunk to false',()=>{
        let titanik=new Ship(2);
        titanik.hit();
        expect(titanik.isSunk()).toBe(false);
    })
})