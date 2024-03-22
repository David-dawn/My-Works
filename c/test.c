#include <stdio.h>
#include <stdbool.h>

char board[3][3]; // The game board
char currentPlayer = 'X'; // Current player: 'X' or 'O'

// Function to initialize the game board with empty cells
void initializeBoard() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            board[i][j] = '-';
        }
    }
}

// Function to print the current state of the game board
void printBoard() {
    printf("  0 1 2\n");
    for (int i = 0; i < 3; i++) {
        printf("%d ", i);
        for (int j = 0; j < 3; j++) {
            printf("%c ", board[i][j]);
        }
        printf("\n");
    }
}

// Function to check if the current player has won
bool checkWin() {
    // Check rows, columns, and diagonals for three matching marks
    for (int i = 0; i < 3; i++) {
        if (board[i][0] == currentPlayer && board[i][1] == currentPlayer && board[i][2] == currentPlayer)
            return true;
        if (board[0][i] == currentPlayer && board[1][i] == currentPlayer && board[2][i] == currentPlayer)
            return true;
    }
    if (board[0][0] == currentPlayer && board[1][1] == currentPlayer && board[2][2] == currentPlayer)
        return true;
    if (board[0][2] == currentPlayer && board[1][1] == currentPlayer && board[2][0] == currentPlayer)
        return true;

    return false;
}

// Function to check if the board is full (draw)
bool isBoardFull() {
    // If any cell is empty, the board is not full
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[i][j] == '-')
                return false;
        }
    }
    return true;
}

int main() {
    initializeBoard();
    bool gameEnded = false;

    while (!gameEnded) {
        printBoard();
        printf("Player %c's turn. Enter row (0-2) and column (0-2) separated by space: ", currentPlayer);

        // Read player's input for row and column
        int row, col;
        scanf("%d %d", &row, &col);

        // Check if the chosen position is valid
        if (row < 0 || row >= 3 || col < 0 || col >= 3 || board[row][col] != '-') {
            printf("Invalid move! Try again.\n");
            continue;
        }

        // Place player's mark on the board
        board[row][col] = currentPlayer;

        // Check if the current player has won
        if (checkWin()) {
            printBoard();
            printf("Player %c wins!\n", currentPlayer);
            gameEnded = true;
        }
        // Check if the board is full (draw)
        else if (isBoardFull()) {
            printBoard();
            printf("It's a draw!\n");
            gameEnded = true;
        }
        else {
            // Switch to the other player
            currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
        }
    }

    return 0;
}
