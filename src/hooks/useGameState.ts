import { useState, useCallback } from 'react';
import { GameState, Piece, PieceType, Square } from '@/types/game';
import {
  createInitialState,
  getValidMoves,
  getEmptySquares,
  checkWinner,
  createPiece,
  shouldPawnReverseDirection,
} from '@/utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialState());

  const resetGame = useCallback(() => {
    setGameState(createInitialState());
  }, []);

  const selectReservePiece = useCallback((pieceType: PieceType) => {
    setGameState(prev => {
      if (prev.winner) return prev;
      
      const reserve = prev.currentPlayer === 'white' ? prev.whiteReserve : prev.blackReserve;
      if (!reserve.includes(pieceType)) return prev;

      const validMoves = getEmptySquares(prev.board);

      return {
        ...prev,
        selectedPiece: null,
        selectedReservePiece: pieceType,
        validMoves,
      };
    });
  }, []);

  const selectBoardPiece = useCallback((row: number, col: number) => {
    setGameState(prev => {
      if (prev.winner) return prev;
      
      const piece = prev.board[row][col];
      if (!piece || piece.player !== prev.currentPlayer) return prev;

      // Can only move pieces after placing first 3
      const piecesPlaced = prev.currentPlayer === 'white' ? prev.whitePiecesPlaced : prev.blackPiecesPlaced;
      if (piecesPlaced < 3) return prev;

      const validMoves = getValidMoves(piece, row, col, prev.board);

      return {
        ...prev,
        selectedPiece: { row, col },
        selectedReservePiece: null,
        validMoves,
      };
    });
  }, []);

  const placePiece = useCallback((row: number, col: number) => {
    setGameState(prev => {
      if (prev.winner || !prev.selectedReservePiece) return prev;
      if (prev.board[row][col]) return prev;

      const newBoard = prev.board.map(r => [...r]);
      const piece = createPiece(prev.selectedReservePiece, prev.currentPlayer);
      
      // Handle pawn placement direction for captured pawns
      if (piece.type === 'pawn') {
        // When placing a pawn, it always starts moving toward opponent's side
        piece.pawnDirection = prev.currentPlayer === 'white' ? 'right' : 'left';
        piece.hasReachedEnd = false;
      }
      
      newBoard[row][col] = piece;

      const newReserve = prev.currentPlayer === 'white'
        ? prev.whiteReserve.filter((_, i) => i !== prev.whiteReserve.indexOf(prev.selectedReservePiece!))
        : prev.blackReserve.filter((_, i) => i !== prev.blackReserve.indexOf(prev.selectedReservePiece!));

      const { winner, winningSquares } = checkWinner(newBoard);

      const newPiecesPlaced = prev.currentPlayer === 'white'
        ? prev.whitePiecesPlaced + 1
        : prev.blackPiecesPlaced;
      const newBlackPiecesPlaced = prev.currentPlayer === 'black'
        ? prev.blackPiecesPlaced + 1
        : prev.blackPiecesPlaced;

      return {
        ...prev,
        board: newBoard,
        currentPlayer: winner ? prev.currentPlayer : (prev.currentPlayer === 'white' ? 'black' : 'white'),
        whitePiecesPlaced: prev.currentPlayer === 'white' ? newPiecesPlaced : prev.whitePiecesPlaced,
        blackPiecesPlaced: prev.currentPlayer === 'black' ? newBlackPiecesPlaced : prev.blackPiecesPlaced,
        whiteReserve: prev.currentPlayer === 'white' ? newReserve : prev.whiteReserve,
        blackReserve: prev.currentPlayer === 'black' ? newReserve : prev.blackReserve,
        selectedPiece: null,
        selectedReservePiece: null,
        validMoves: [],
        winner,
        winningSquares,
      };
    });
  }, []);

  const movePiece = useCallback((toRow: number, toCol: number) => {
    setGameState(prev => {
      if (prev.winner || !prev.selectedPiece) return prev;

      const { row: fromRow, col: fromCol } = prev.selectedPiece;
      const piece = prev.board[fromRow][fromCol];
      if (!piece) return prev;

      const isValidMove = prev.validMoves.some(m => m.row === toRow && m.col === toCol);
      if (!isValidMove) return prev;

      const newBoard = prev.board.map(r => [...r]);
      const capturedPiece = newBoard[toRow][toCol];

      // Handle pawn direction reversal
      let movedPiece = { ...piece };
      if (shouldPawnReverseDirection(movedPiece, toCol)) {
        movedPiece.pawnDirection = movedPiece.pawnDirection === 'right' ? 'left' : 'right';
        movedPiece.hasReachedEnd = true;
      }

      newBoard[toRow][toCol] = movedPiece;
      newBoard[fromRow][fromCol] = null;

      // Return captured piece to opponent's reserve
      let newWhiteReserve = [...prev.whiteReserve];
      let newBlackReserve = [...prev.blackReserve];
      
      if (capturedPiece) {
        if (capturedPiece.player === 'white') {
          newWhiteReserve.push(capturedPiece.type);
        } else {
          newBlackReserve.push(capturedPiece.type);
        }
      }

      const { winner, winningSquares } = checkWinner(newBoard);

      return {
        ...prev,
        board: newBoard,
        currentPlayer: winner ? prev.currentPlayer : (prev.currentPlayer === 'white' ? 'black' : 'white'),
        whiteReserve: newWhiteReserve,
        blackReserve: newBlackReserve,
        selectedPiece: null,
        selectedReservePiece: null,
        validMoves: [],
        winner,
        winningSquares,
      };
    });
  }, []);

  const handleSquareClick = useCallback((row: number, col: number) => {
    setGameState(prev => {
      if (prev.winner) return prev;

      // If we have a selected reserve piece and clicking on empty square
      if (prev.selectedReservePiece && !prev.board[row][col]) {
        return prev; // Let placePiece handle it
      }

      // If we have a selected board piece and clicking on valid move
      if (prev.selectedPiece) {
        const isValidMove = prev.validMoves.some(m => m.row === row && m.col === col);
        if (isValidMove) {
          return prev; // Let movePiece handle it
        }
      }

      // If clicking on own piece, select it
      const piece = prev.board[row][col];
      if (piece && piece.player === prev.currentPlayer) {
        const piecesPlaced = prev.currentPlayer === 'white' ? prev.whitePiecesPlaced : prev.blackPiecesPlaced;
        if (piecesPlaced >= 3) {
          const validMoves = getValidMoves(piece, row, col, prev.board);
          return {
            ...prev,
            selectedPiece: { row, col },
            selectedReservePiece: null,
            validMoves,
          };
        }
      }

      // Clear selection
      return {
        ...prev,
        selectedPiece: null,
        selectedReservePiece: null,
        validMoves: [],
      };
    });
  }, []);

  const clearSelection = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      selectedPiece: null,
      selectedReservePiece: null,
      validMoves: [],
    }));
  }, []);

  return {
    gameState,
    resetGame,
    selectReservePiece,
    selectBoardPiece,
    placePiece,
    movePiece,
    clearSelection,
  };
};
