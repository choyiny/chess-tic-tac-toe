import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { GameHeader } from './GameHeader';
import { GameBoard } from './GameBoard';
import { PieceReserve } from './PieceReserve';
import { WinnerModal } from './WinnerModal';
import { RulesModal } from './RulesModal';

export const GameContainer = () => {
  const {
    gameState,
    resetGame,
    selectReservePiece,
    selectBoardPiece,
    placePiece,
    movePiece,
    clearSelection,
  } = useGameState();

  const [showRules, setShowRules] = useState(false);

  const handleSquareClick = (row: number, col: number) => {
    const { board, selectedPiece, selectedReservePiece, validMoves, currentPlayer } = gameState;
    
    // Check if this is a valid move target
    const isValidMove = validMoves.some(m => m.row === row && m.col === col);
    
    if (selectedReservePiece && isValidMove) {
      // Place piece from reserve
      placePiece(row, col);
      return;
    }

    if (selectedPiece && isValidMove) {
      // Move piece on board
      movePiece(row, col);
      return;
    }

    // Check if clicking on own piece
    const piece = board[row][col];
    if (piece && piece.player === currentPlayer) {
      selectBoardPiece(row, col);
      return;
    }

    // Clear selection
    clearSelection();
  };

  const handleReservePieceClick = (pieceType: string) => {
    selectReservePiece(pieceType as any);
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-start py-2 px-2 sm:py-6 sm:px-4 md:py-10 md:px-8">
      <GameHeader
        currentPlayer={gameState.currentPlayer}
        onReset={resetGame}
        onShowRules={() => setShowRules(true)}
      />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-8 w-full max-w-5xl flex-1">
        {/* Game Board - Center */}
        <div className="order-1 lg:order-2 flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] mx-auto">
          <GameBoard
            gameState={gameState}
            onSquareClick={handleSquareClick}
          />
        </div>

        {/* Reserves container - Side by side on mobile, separate on desktop */}
        <div className="order-2 lg:order-1 lg:order-3 flex flex-row lg:flex-col gap-2 sm:gap-4 w-full lg:w-auto justify-center lg:contents">
          <PieceReserve
            pieces={gameState.whiteReserve}
            player="white"
            isActive={gameState.currentPlayer === 'white' && !gameState.winner}
            selectedPiece={gameState.currentPlayer === 'white' ? gameState.selectedReservePiece : null}
            onSelectPiece={handleReservePieceClick}
            piecesPlaced={gameState.whitePiecesPlaced}
          />
          <PieceReserve
            pieces={gameState.blackReserve}
            player="black"
            isActive={gameState.currentPlayer === 'black' && !gameState.winner}
            selectedPiece={gameState.currentPlayer === 'black' ? gameState.selectedReservePiece : null}
            onSelectPiece={handleReservePieceClick}
            piecesPlaced={gameState.blackPiecesPlaced}
          />
        </div>
      </div>

      {/* Winner Modal */}
      <WinnerModal winner={gameState.winner} onPlayAgain={resetGame} />

      {/* Rules Modal */}
      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
};
