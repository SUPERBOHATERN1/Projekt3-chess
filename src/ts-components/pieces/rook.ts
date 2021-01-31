"use stricte"

import {Piece} from "./piece";
import {ID} from "./../board";
import { Game } from "../game";

//wieża
class Rook extends Piece{

    constructor(color:string, positionX:string, positionY:number){
        super(color, positionX, positionY);
        this.symbol = `../../../static/assets/${this.color}Rook.png`;
        this.setOnBoard(this.positionX, this.positionY);
    }

    showPossibleMoves():void{
        this.removeClassActive();
        const arrayOfX:string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        // const indexOfX:number = arrayOfX.indexOf(this.getPositionX());

        const rookLineX:string = this.getPositionX();
        const rookLineY:number = this.getPositionY();

        const checkYAxis = ()=>{
            // top
            console.log(rookLineX,rookLineY)
            for(let i=rookLineY+1;i<=8;i++){
                let squareY = document.querySelector(`#${rookLineX}-${i}`);
                if(!squareY?.classList.contains('pieceInside')){
                    if (squareY != null)
                    squareY.classList.add('active');
                }
                else{
                    break;
                }
            }
            // bot
            for(let i=rookLineY-1;i>0;i--){
                let squareY = document.querySelector(`#${rookLineX}-${i}`);
                if(!squareY?.classList.contains('pieceInside')){
                    if (squareY != null)
                    squareY.classList.add('active');
                }
                else{
                    break;
                }
            }
        }
        const checkXAxis = ()=>{
            // right
            const clickedElementIndex = arrayOfX.indexOf(rookLineX)
            for(let i=clickedElementIndex;i<=8;i++){
                let squareY = document.querySelector(`#${arrayOfX[i+1]}-${rookLineY}`);
                if(!squareY?.classList.contains('pieceInside')){
                    if (squareY != null)
                    squareY.classList.add('active');
                }
                else{
                    break;
                }
            }
            // left
            for(let i=clickedElementIndex;i>0;i--){
                let squareY = document.querySelector(`#${arrayOfX[i-1]}-${rookLineY}`);
                if(!squareY?.classList.contains('pieceInside')){
                    if (squareY != null)
                    squareY.classList.add('active');
                }
                else{
                    break;
                }
            }
        }
        checkYAxis();
        checkXAxis();

        const squares:NodeList = document.querySelectorAll('.board-container div');
        squares.forEach(square => {
            square.addEventListener('click', (e) => {
                let pickedFigure = e.currentTarget;

                if(!((square as HTMLElement).classList.contains('pieceInside')) && (square as HTMLElement).classList.contains('active')   && (Game.getLastChosen() === this)){
                    this.setOnBoard((square as HTMLElement).id.charAt(0), parseInt((square as HTMLElement).id.charAt(2)));
                    squares.forEach(square => (square as HTMLElement).classList.remove('active'));
                }
            });
        });
    }
}

export {Rook};