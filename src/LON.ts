import { Compiler } from "./Compiler/Compiler";
import { ProgramInput } from "./UI/ProgramInput"

export const LON = class {
    compiler = Compiler;
    input = new ProgramInput(this.compiler);
    
    static start = () => {
        const instance = new LON();
        instance.input.buildUI();
        (window as any).LON = instance;
    }
}