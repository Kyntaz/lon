import { Camoes as C } from "camoes";

export const Parser = class {
    static #getGrammar = () => {
        const specialChars = ["(", ")", ","];
        const ws = /[\s\n\r]*/;

        return C.grammar()
            .match("List", C.variable("Inner"), ["(", C.invoke("LoA", "Inner"), ")"])
            .match("LoA", [C.variable("A"), C.variable("T")], [ws, C.invoke("Atom", "A"), ",", C.invoke("LoA", "T")], {
                transformation: (result) => [result[0], ...result[1]],
            })
            .match("LoA", [C.variable("A")], [ws, C.invoke("Atom", "A")])
            .match("LoA", [], [ws])
            .match("Atom", C.variable("A"), [ws, C.variable("A", {
                guard: (value: string) => specialChars.map((ch) => !value.includes(ch)).every((b) => b),
            })])
            .match("Atom", C.variable("L"), [ws, C.invoke("List", "L"), ws])
    }

    static parse = (program: string) => {
        const grammar = this.#getGrammar();
        return grammar.parse("LoA", program);
    }
}
