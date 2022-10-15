import htmlString from "./ProgramInput.html?raw";
import "./ProgramInput.css";
import { Compiler } from "../Compiler/Compiler";

export const ProgramInput = class {
    #compiler: typeof Compiler

    constructor (compiler: typeof Compiler) {
        this.#compiler = compiler;
    } 

    buildUI = () => {
        const root = document.getElementById("root");
        if (!root) {
            return console.error("Couldn't find root element");
        }

        root.innerHTML = htmlString;
        this.#attachInputListener(root);
    }

    #attachInputListener = (root: HTMLElement) => {
        const input = root.firstElementChild as HTMLElement;
        if (!input) {
            return console.error("Couldn't find input element");
        }

        input.addEventListener("keydown", (event) => {
            const keyboardEvent = event as KeyboardEvent;
            if (keyboardEvent.code === "Enter" && keyboardEvent.ctrlKey) {
                keyboardEvent.preventDefault();
                this.#commitInput(input);
            }
        });
    }

    #commitInput = async (input: HTMLElement) => {
        input.classList.add("compiling");
        await this.#compiler.compile(input.textContent ?? "");
        setTimeout(() => input.classList.remove("compiling"));
    }
}
