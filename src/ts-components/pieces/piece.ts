import { Game } from "../game"

abstract class Piece{
    protected color:string;
    protected symbol:string = ''; //<-- domyślnie ustawiłem puste, bo każda figura ma inny symbol
    protected positionX:string;
    protected positionY:number;
    protected possibleMovesIDs:string[];    //<-- tablica ID pól na które może przemieścić się figura
    protected parentSquare:HTMLElement; //<-- div w którym "siedzi" img z obrazkiem danej figury
    //zastanawiam się czy nie zrobić tych wszystkich właściwości private...

    constructor(color:string, positionX:string, positionY:number){
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
        this.possibleMovesIDs = this.showPossibleMoves();

        this.parentSquare = document.getElementById(`${this.positionX}-${this.positionY}`)!; //<-- parentSquare przechowuje diva, w którym obecnie znajduje się figura
    }

    setOnBoard(pX:string, pY:number):void{ //<-- ta metoda zmienia miejsce na szachownicy w którym wyświetla się figura (ale za zmienienie składowych positionX i positionY odpowiada metoda updatePosition())
        //w pierwszych dwóch linijkach usuwamy figurę z obecnego miejsca, następnie ustawiamy w nowym
        this.parentSquare.innerHTML = "";
        this.parentSquare.classList.remove('pieceInside');
        const img = document.createElement('img');
        img.classList.add('image');
        img.classList.add(`${this.color}`.toLowerCase());
        img.setAttribute('src', this.symbol);
        this.updatePosition(pX, pY);
        this.parentSquare.appendChild(img);
        const imgContainer = img.parentElement !as HTMLElement;
        imgContainer.classList.add('pieceInside');
    }

    updatePosition(pX:string, pY:number):void{ //<-- ta metoda aktualizuje stan właściwości positionX i positionY (ale za samo wyświetlenie figury w nowym miejscu odpowiada setOnBoard())
        this.positionX = pX;
        this.positionY = pY;
        this.parentSquare = document.getElementById(`${this.positionX}-${this.positionY}`)!;
    }

    removeClassActive():void{   //<-- ta metoda usuwa klasę 'active' ze wszystkich pól
        let elems = document.querySelectorAll('.active');
        for (var i = 0; i < elems.length; i++) {
            elems[i]!.classList.remove('active');
            if (elems[i]!.classList.contains('en-pass')) {
                elems[i]!.classList.remove('en-pass');
            }
        }
    }

    getPositionX(){
        return this.positionX;
    }

    getPositionY(){
        return this.positionY;
    }

    getColor(){
        return this.color;
    }

    defendKing(possibleMoves:string[]){
        const initialX = this.positionX;
        const initialY = this.positionY;
        const king = this.color === 'white' ? Game.getWhiteKing() : Game.getBlackKing();
        const defendingIDs:string[] = [];

        possibleMoves.forEach(move => {
            if(document.querySelector(`#${move}`)!.innerHTML === ''){
                this.setOnBoard(move.charAt(0), parseFloat(move.charAt(2)));
                if(!king.isChecked())
                    defendingIDs.push(move);
            }
        });

        this.setOnBoard(initialX, initialY);

        return defendingIDs;
    }

    abstract showPossibleMoves():string[];
    abstract move():void;
}

export {Piece};