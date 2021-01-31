"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const board_1 = require("./board");
const bishop_1 = require("./pieces/bishop");
const king_1 = require("./pieces/king");
const knight_1 = require("./pieces/knight");
const queen_1 = require("./pieces/queen");
const rook_1 = require("./pieces/rook");
const pawn_1 = require("./pieces/pawn");
const board_2 = require("./board");
class Game {
    constructor() {
        //private whoNext:string;
        this.whites = [];
        this.blacks = [];
        this.gameBoard = new board_1.Board;
        this.gameBoard.drawBoard();
        this.whites.push(new queen_1.Queen('white', `${board_2.ID[4]}`, 1));
        this.whites.push(new king_1.King('white', `${board_2.ID[5]}`, 1));
        this.blacks.push(new queen_1.Queen('black', `${board_2.ID[4]}`, 8));
        this.blacks.push(new king_1.King('black', `${board_2.ID[5]}`, 8));
        for (let i = 3; i <= 6; i += 3) {
            this.whites.push(new bishop_1.Bishop('white', `${board_2.ID[i]}`, 1));
            this.blacks.push(new bishop_1.Bishop('black', `${board_2.ID[i]}`, 8));
        }
        for (let i = 2; i <= 7; i += 5) {
            this.whites.push(new knight_1.Knight('white', `${board_2.ID[i]}`, 1));
            this.blacks.push(new knight_1.Knight('black', `${board_2.ID[i]}`, 8));
        }
        for (let i = 1; i <= 8; i += 7) {
            this.whites.push(new rook_1.Rook('white', `${board_2.ID[i]}`, 1));
            this.blacks.push(new rook_1.Rook('black', `${board_2.ID[i]}`, 8));
        }
        for (let i = 1; i <= 8; i++) {
            this.whites.push(new pawn_1.Pawn('white', `${board_2.ID[i]}`, 2));
            this.blacks.push(new pawn_1.Pawn('black', `${board_2.ID[i]}`, 7));
        }
    }
    startMove(square) {
        const x = square.id.charAt(0);
        const y = parseInt(square.id.charAt(2));
        for (let p of this.whites) {
            if (p.getPositionX() == x && p.getPositionY() == y) {
                this.setLastChosen(p);
                p.move();
            }
        }
        for (let p of this.blacks) {
            if (p.getPositionX() == x && p.getPositionY() == y) {
                this.setLastChosen(p);
                p.move();
            }
        }
    }
    setLastChosen(piece) {
        Game.lastChosen = piece;
    }
    static getLastChosen() {
        return Game.lastChosen;
    }
}
exports.Game = Game;
