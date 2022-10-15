import { Parser } from "./Parser";

export const Compiler = class {
    static parser = Parser;

    static compile = async (program: string) => {
        return new Promise<void>((resolve) => {
            const list = this.parser.parse(program);
            console.log(list);
            return resolve();
        });
    }
}