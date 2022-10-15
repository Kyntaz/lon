import { Preprocessor } from "./Preprocessor";

export const Compiler = class {
    static compile = async (program: string) => {
        return new Promise<void>((resolve) => {
            const list = Preprocessor.programToJSONList(program);
            console.log(list);
            return resolve();
        });
    }
}