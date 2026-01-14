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

      {/* Mobile layout: Board on top, reserves side by side below */}
      <div className="flex flex-col lg:hidden items-center gap-2 sm:gap-4 w-full flex-1">
        <div className="flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] mx-auto">
          <GameBoard
            gameState={gameState}
            onSquareClick={handleSquareClick}
          />
        </div>
        <div className="flex flex-row gap-2 sm:gap-4 w-full justify-center">
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

      {/* Desktop layout: Player 1 left, Board center, Player 2 right */}
      <div className="hidden lg:flex flex-row items-center justify-center gap-8 w-full max-w-5xl flex-1">
        <PieceReserve
          pieces={gameState.whiteReserve}
          player="white"
          isActive={gameState.currentPlayer === 'white' && !gameState.winner}
          selectedPiece={gameState.currentPlayer === 'white' ? gameState.selectedReservePiece : null}
          onSelectPiece={handleReservePieceClick}
          piecesPlaced={gameState.whitePiecesPlaced}
        />
        <div className="flex-shrink-0 w-full max-w-[380px]">
          <GameBoard
            gameState={gameState}
            onSquareClick={handleSquareClick}
          />
        </div>
        <PieceReserve
          pieces={gameState.blackReserve}
          player="black"
          isActive={gameState.currentPlayer === 'black' && !gameState.winner}
          selectedPiece={gameState.currentPlayer === 'black' ? gameState.selectedReservePiece : null}
          onSelectPiece={handleReservePieceClick}
          piecesPlaced={gameState.blackPiecesPlaced}
        />
      </div>

      {/* Winner Modal */}
      <WinnerModal winner={gameState.winner} onPlayAgain={resetGame} />

      {/* Rules Modal */}
      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
};
