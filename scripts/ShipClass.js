class Ship{
    constructor(length){
        this.length=length;
        this.hits=0;
        this.sunk=false;
    }

    hit(){
        this.hits++;
    }

    isSunk(){
        return this.hits>=this.length?this.sunk=true:this.sunk=false;
    }



}

// let titanik=new Ship(3);
// titanik.hit();
// titanik.hit();
// titanik.hit();
// console.log(titanik.isSunk());

