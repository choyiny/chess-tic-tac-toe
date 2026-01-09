export type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook';
export type Player = 'white' | 'black';

export interface Piece {
  type: PieceType;
  player: Player;
  pawnDirection: 'left' | 'right'; // For pawn horizontal movement
  hasReachedEnd: boolean; // Track if pawn has reached the opposite side
}

export interface Square {
  row: number;
  col: number;
}

export interface GameState {
  board: (Piece | null)[][];
  currentPlayer: Player;
  phase: 'placement' | 'play';
  whitePiecesPlaced: number;
  blackPiecesPlaced: number;
  whiteReserve: PieceType[];
  blackReserve: PieceType[];
  selectedPiece: Square | null;
  selectedReservePiece: PieceType | null;
  validMoves: Square[];
  winner: Player | null;
  winningSquares: Square[];
}

export const INITIAL_PIECES: PieceType[] = ['rook', 'bishop', 'knight', 'pawn'];

export const PIECE_SYMBOLS: Record<PieceType, string> = {
  pawn: '♟',
  knight: '♞',
  bishop: '♝',
  rook: '♜',
};
