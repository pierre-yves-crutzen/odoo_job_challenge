var Calc = {
    calculate: function (expr) {
        if (expr === "" || typeof (expr) !== "string") {
            return 0
        };
        var ar = expr.split(/\s+/),
            st = [],
            op;
        while (op = ar.shift()) {
            if (op == +op) { // numeric
                st.push(op);
            } else {
                var n2 = st.pop(),
                    n1 = st.pop();
                st.push(eval(n1 + op + ' ' + n2));
            }
        }
        console.log(st.pop());
        return Number(st.pop());
    }
}

Calc.calculate("1 2 + 3 4 * + 5.2 ** 3 +");