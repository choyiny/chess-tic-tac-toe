import { GameState, Piece, PieceType, Player, Square, INITIAL_PIECES } from '@/types/game';

export const createInitialState = (): GameState => ({
  board: Array(4).fill(null).map(() => Array(4).fill(null)),
  currentPlayer: 'white',
  phase: 'placement',
  whitePiecesPlaced: 0,
  blackPiecesPlaced: 0,
  whiteReserve: [...INITIAL_PIECES],
  blackReserve: [...INITIAL_PIECES],
  selectedPiece: null,
  selectedReservePiece: null,
  validMoves: [],
  winner: null,
  winningSquares: [],
});

export const isValidSquare = (row: number, col: number): boolean => {
  return row >= 0 && row < 4 && col >= 0 && col < 4;
};

export const getPawnMoves = (
  piece: Piece,
  row: number,
  col: number,
  board: (Piece | null)[][]
): Square[] => {
  const moves: Square[] = [];
  const direction = piece.pawnDirection === 'right' ? 1 : -1;

  // Horizontal move (only if empty)
  const newCol = col + direction;
  if (isValidSquare(row, newCol) && !board[row][newCol]) {
    moves.push({ row, col: newCol });
  }

  // Diagonal captures (in the direction of movement)
  for (const dr of [-1, 1]) {
    const diagRow = row + dr;
    if (
      isValidSquare(diagRow, newCol) &&
      board[diagRow][newCol] &&
      board[diagRow][newCol]!.player !== piece.player
    ) {
      moves.push({ row: diagRow, col: newCol });
    }
  }

  return moves;
};

export const getKnightMoves = (
  piece: Piece,
  row: number,
  col: number,
  board: (Piece | null)[][]
): Square[] => {
  const moves: Square[] = [];
  const offsets = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];

  for (const [dr, dc] of offsets) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (
      isValidSquare(newRow, newCol) &&
      (!board[newRow][newCol] || board[newRow][newCol]!.player !== piece.player)
    ) {
      moves.push({ row: newRow, col: newCol });
    }
  }

  return moves;
};

export const getBishopMoves = (
  piece: Piece,
  row: number,
  col: number,
  board: (Piece | null)[][]
): Square[] => {
  const moves: Square[] = [];
  const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

  for (const [dr, dc] of directions) {
    let newRow = row + dr;
    let newCol = col + dc;
    while (isValidSquare(newRow, newCol)) {
      if (!board[newRow][newCol]) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (board[newRow][newCol]!.player !== piece.player) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }
      newRow += dr;
      newCol += dc;
    }
  }

  return moves;
};

export const getRookMoves = (
  piece: Piece,
  row: number,
  col: number,
  board: (Piece | null)[][]
): Square[] => {
  const moves: Square[] = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (const [dr, dc] of directions) {
    let newRow = row + dr;
    let newCol = col + dc;
    while (isValidSquare(newRow, newCol)) {
      if (!board[newRow][newCol]) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (board[newRow][newCol]!.player !== piece.player) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }
      newRow += dr;
      newCol += dc;
    }
  }

  return moves;
};

export const getValidMoves = (
  piece: Piece,
  row: number,
  col: number,
  board: (Piece | null)[][]
): Square[] => {
  switch (piece.type) {
    case 'pawn':
      return getPawnMoves(piece, row, col, board);
    case 'knight':
      return getKnightMoves(piece, row, col, board);
    case 'bishop':
      return getBishopMoves(piece, row, col, board);
    case 'rook':
      return getRookMoves(piece, row, col, board);
    default:
      return [];
  }
};

export const getEmptySquares = (board: (Piece | null)[][]): Square[] => {
  const empty: Square[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (!board[row][col]) {
        empty.push({ row, col });
      }
    }
  }
  return empty;
};

export const checkWinner = (board: (Piece | null)[][]): { winner: Player | null; winningSquares: Square[] } => {
  // Check rows
  for (let row = 0; row < 4; row++) {
    const first = board[row][0];
    if (first && board[row].every(cell => cell?.player === first.player)) {
      return {
        winner: first.player,
        winningSquares: [0, 1, 2, 3].map(col => ({ row, col }))
      };
    }
  }

  // Check columns
  for (let col = 0; col < 4; col++) {
    const first = board[0][col];
    if (first && [0, 1, 2, 3].every(row => board[row][col]?.player === first.player)) {
      return {
        winner: first.player,
        winningSquares: [0, 1, 2, 3].map(row => ({ row, col }))
      };
    }
  }

  // Check diagonals
  const topLeft = board[0][0];
  if (topLeft && [0, 1, 2, 3].every(i => board[i][i]?.player === topLeft.player)) {
    return {
      winner: topLeft.player,
      winningSquares: [0, 1, 2, 3].map(i => ({ row: i, col: i }))
    };
  }

  const topRight = board[0][3];
  if (topRight && [0, 1, 2, 3].every(i => board[i][3 - i]?.player === topRight.player)) {
    return {
      winner: topRight.player,
      winningSquares: [0, 1, 2, 3].map(i => ({ row: i, col: 3 - i }))
    };
  }

  return { winner: null, winningSquares: [] };
};

export const createPiece = (type: PieceType, player: Player): Piece => ({
  type,
  player,
  pawnDirection: player === 'white' ? 'right' : 'left',
  hasReachedEnd: false,
});

export const shouldPawnReverseDirection = (piece: Piece, newCol: number): boolean => {
  if (piece.type !== 'pawn') return false;
  
  // White pawns reverse when reaching the right edge (col 3)
  if (piece.pawnDirection === 'right' && newCol === 3) {
    return true;
  }
  // Black pawns reverse when reaching the left edge (col 0)
  if (piece.pawnDirection === 'left' && newCol === 0) {
    return true;
  }
  return false;
};
