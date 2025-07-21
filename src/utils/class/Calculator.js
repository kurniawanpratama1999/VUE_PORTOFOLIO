class Calculator {
    #str;
    #priority = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    }
        
    constructor (str) {
        this.#str = str;
    }
    
    #tokenize () {
        const tokens = [];
        let joinNumber = '';

        for (let i = 0; i < this.#str.length; i++) {
            const char = this.#str[i];
            if (char === " ") continue;
            
            const isNumber = '1234567890'.includes(char)
            const isOperator = "+-*/()".includes(char)

            if (isNumber || char === ".") {
                joinNumber += char;
            } else if (isOperator) {
                if (joinNumber) {

                    tokens.push(Number(joinNumber));
                    joinNumber = "";
                }

                tokens.push(char);
            }

        }
        
        if (joinNumber) {
            tokens.push(Number(joinNumber));
        }

        return tokens;
    }

    #shuntingYard () {
        const tokens = this.#tokenize();
        const operators = [];
        const outputs = [];

        if (tokens.length == 0) return 0;
        for (let token of tokens) {
            if (typeof token == 'number') outputs.push(token);
            if ('+-*/'.includes(token)) {
                while (operators.length !== 0
                && "+-*/".includes(operators[operators.length - 1])
                && this.#priority[operators[operators.length - 1]] >= this.#priority[token]) {
                    outputs.push(operators.pop());
                }
                operators.push(token)
            }
            if (token == "(" ) operators.push(token)
            if (token == ")") {
                while(operators.length !== 0 && operators[operators.length - 1] !== "(" ) {
                    outputs.push(operators.pop());
                }

                operators.pop()
            }

        }
        
        while(operators.length !== 0) {
            outputs.push(operators.pop());
        }

        return outputs;
    }

    evaluate () {
        const postFix = this.#shuntingYard();
        const stack = [];

        for (let token of postFix) {
            if (typeof token === 'number'){
                stack.push(token)
            } else {
                const b = stack.pop()
                const a = stack.pop()

                switch (token) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    case "/": stack.push(a / b); break;
                }
            }
        }

        return stack[0]
    }
}

export default Calculator;