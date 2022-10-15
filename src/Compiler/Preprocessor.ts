export const Preprocessor = class {
    static programToJSONList = (program: string) => {
        const stringifiedList = program
            .replaceAll("(", "[")
            .replaceAll(")", "]");
        
        return JSON.parse(`[${stringifiedList}]`);
    }
}
