import { motion } from 'framer-motion';
import { GameState, Square } from '@/types/game';
import { BoardSquare } from './BoardSquare';

interface GameBoardProps {
  gameState: GameState;
  onSquareClick: (row: number, col: number) => void;
}

export const GameBoard = ({ gameState, onSquareClick }: GameBoardProps) => {
  const { board, selectedPiece, validMoves, winningSquares, currentPlayer } = gameState;

  const isValidMove = (row: number, col: number) =>
    validMoves.some(m => m.row === row && m.col === col);

  const isCapture = (row: number, col: number) =>
    isValidMove(row, col) && board[row][col] !== null;

  const isWinningSquare = (row: number, col: number) =>
    winningSquares.some(s => s.row === row && s.col === col);

  const isSelected = (row: number, col: number) =>
    selectedPiece?.row === row && selectedPiece?.col === col;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative"
    >
      {/* Board shadow/glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-game-gold/20 to-transparent rounded-xl blur-xl" />
      
      {/* Board container */}
      <div className="relative bg-board-border p-2 md:p-3 rounded-xl shadow-2xl">
        <div className="grid grid-cols-4 gap-0.5 md:gap-1 rounded-lg overflow-hidden">
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => (
              <BoardSquare
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                piece={piece}
                isSelected={isSelected(rowIndex, colIndex)}
                isValidMove={isValidMove(rowIndex, colIndex)}
                isCapture={isCapture(rowIndex, colIndex)}
                isWinningSquare={isWinningSquare(rowIndex, colIndex)}
                onClick={() => onSquareClick(rowIndex, colIndex)}
              />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};
