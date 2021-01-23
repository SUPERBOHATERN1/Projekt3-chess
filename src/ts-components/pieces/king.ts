import {Piece} from "./piece";

class King extends Piece{

    constructor(color:string, positionX:number, positionY:number){
        super(color, positionX, positionY);
        this.symbol = color === 'white' ? '♔' : '♚'; //<-- w przyszłości bedzie tu ścieżka do img figury

        this.setOnBoard(this.positionX, this.positionY);
    }

    showPossibleMoves():void{
        //kod odpowiadający za pokazanie możliwych ruchów
    }
}

export {King};