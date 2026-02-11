# ♟️ Chess Tic-Tac-Toe

A strategic masterpiece that fuses the classic simplicity of Tic-Tac-Toe with the tactical depth of Chess.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 Introduction

**Chess Tic-Tac-Toe** is an innovative 2-player strategy game where the goal is to align four of your pieces—horizontally, vertically, or diagonally. However, unlike traditional Tic-Tac-Toe, you don't just place pieces; you can **move** and **capture** them using standard Chess movements once your reserves are depleted.

Currently built with a modern, responsive tech stack, this project showcases a polished UI with smooth animations and a "premium" gold-on-dark aesthetic.

> **Read the story behind the code:** [Chess Tic-Tac-Toe Vibecoded](https://choy.in/blog/chess-tic-tac-toe-vibecoded)

## ✨ Features

-   **Hybrid Gameplay**: Combines the spatial reasoning of Tic-Tac-Toe with Chess tactics.
-   **Phase-Based Strategy**:
    -   **Placement Phase**: Strategically drop your pieces on the board.
    -   **Movement Phase**: Once you've placed 3 pieces, unlock the ability to move and capture.
-   **Chess Mechanics**: Use Pawns, Knights, Bishops, and Rooks with their traditional movement rules.
-   **Responsive Design**: Fully playable on desktop and mobile devices.
-   **Polished UI/UX**:
    -   Elegant dark mode with gold accents.
    -   Smooth framer-motion animations for moves and UI transitions.
    -   Interactive rules modal and winner announcements.

## 🎮 How to Play

### Objective
Be the first player to align **four** of your pieces in a row (horizontally, vertically, or diagonally).

### Game Phases

1.  **Placement Phase**:
    -   Players take turns placing pieces from their reserve onto ANY empty square on the 4x4 board.
    -   You must place your first **3 pieces** before unlocking movement.

2.  **Movement Phase**:
    -   After placing 3 pieces, on your turn you may either:
        -   **Place** your remaining piece (if you have one).
        -   **Move** one of your pieces on the board.
    -   Capturing an opponent's piece returns it to their reserve, forcing them to place it again.

### Piece Movements
Pieces move primarily according to standard Chess rules (adapted for the 4x4 grid):

-   **♟️ Pawn**: Moves 1 square forward. Captures diagonally forward. *Special: Reverses play direction when reaching the opposite side.*
-   **♞ Knight**: Moves in an "L" shape (2 squares one way, 1 square perpendicular). Jumps over other pieces.
-   **♝ Bishop**: Moves diagonally any number of squares. Cannot jump.
-   **♜ Rook**: Moves horizontally or vertically any number of squares. Cannot jump.

## 🛠️ Tech Stack

This project is built with a modern React ecosystem:

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (based on Radix UI)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **State Management**: React Hooks & Context (custom `useGameState`)

## 🚀 Getting Started

Follow these steps to get the project up and running locally.

### Prerequisites
-   Node.js (v18 or higher recommended)
-   npm, yarn, or bun

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/chess-tic-tac-toe.git
    cd chess-tic-tac-toe
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:8080` (or the port shown in your terminal).

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, better AI, or UI improvements:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

*Enjoy the game!*
