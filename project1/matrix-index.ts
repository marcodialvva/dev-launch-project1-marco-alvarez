import PromptSync from 'prompt-sync';
const Prompt = PromptSync();

class Card {
    public isRevealed: boolean;

    constructor(public symbol: string) {
        this.symbol = symbol;
        this.isRevealed = false;
    }
}

class Memory {
    private symbols: string[];
    private board: Card[][];

    constructor(private size: number) {
        this.symbols = ['😀', '🎉', '🐶', '🍕', '🚀', '🌟', '💡', '⚽'];
        this.board = [];
        this.size = size;
        this.init();
    }

    public start() {
        while (!this.checkWinner()) {
            console.clear();
            this.print();

            let x = parseInt(Prompt('Row: '));
            let y = parseInt(Prompt('Col: '));
            while (!this.isValidInput(x, y) || this.board[x][y].isRevealed) {
                console.log("Entrada inválida. Intenta de nuevo.");
                x = parseInt(Prompt('Row: '));
                y = parseInt(Prompt('Col: '));
            }

            this.reveal(x, y);
            console.clear();
            this.print();

            let w = parseInt(Prompt("Row: *"));
            let z = parseInt(Prompt("Col: *"));
            while (
                !this.isValidInput(w, z) ||
                this.board[w][z].isRevealed ||
                (x === w && y === z)
            ) {
                console.log("Entrada inválida. Intenta de nuevo.");
                w = parseInt(Prompt("Row: *"));
                z = parseInt(Prompt("Col: *"));
            }

            this.reveal(w, z);
            console.clear();
            this.print();

            const hint1 = this.board[x][y];
            const hint2 = this.board[w][z];

            if (hint1.symbol !== hint2.symbol) {
                console.log("No coinciden. Intenta de nuevo.");
                Prompt("Presiona ENTER para continuar...");
                this.board[x][y].isRevealed = false;
                this.board[w][z].isRevealed = false;
            } else {
                console.log("¡Buen trabajo! Encontraste una pareja.");
                Prompt("Presiona ENTER para continuar...");
            }
        }

        console.clear();
        this.print();
        console.log("🎉 ¡Felicidades! Has ganado. 🎉");
    }

    private isValidInput(row: number, col: number): boolean {
        return (
            !isNaN(row) &&
            !isNaN(col) &&
            row >= 0 &&
            row < this.size &&
            col >= 0 &&
            col < this.size
        );
    }

    private checkWinner(): boolean {
        for (let row of this.board) {
            for (let hint of row) {
                if (!hint.isRevealed) {
                    return false;
                }
            }
        }
        return true;
    }

    public reveal(row: number, col: number): void {
        this.board[row][col].isRevealed = true;
    }

    public print(): void {
        const border = "_".repeat(this.board[0].length * 4 + 1);
        console.log(border);
        for (const row of this.board) {
            console.log("| " + row.map(item => item.isRevealed ? item.symbol : "*").join(" ") + " |");
        }
        console.log(border);
    }

    private init(): void {
        const hints = this.getRandomizedEmojiPairs(this.size);

        for (let i = 0; i < this.size; i++) {
            this.board.push([]);
            for (let j = 0; j < this.size; j++) {
                this.board[i].push(new Card(hints.pop()!));
            }
        }
    }

    private getRandomizedEmojiPairs = (n: number): string[] => {
        const totalCards = n * n;
        const totalHints = totalCards / 2;

        if (totalHints > this.symbols.length) {
            throw new Error("El número excede la cantidad de símbolos disponibles");
        }

        const selectedEmojis = this.symbols.slice(0, totalHints);
        const pairedEmojis = [...selectedEmojis, ...selectedEmojis];

        for (let i = pairedEmojis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairedEmojis[i], pairedEmojis[j]] = [pairedEmojis[j], pairedEmojis[i]];
        }

        return pairedEmojis;
    }
}

function main() {
    const game = new Memory(4); // 4x4 board
    game.start();
}
main();