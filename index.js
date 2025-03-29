// npm init -y
// npm i express
const express = require("express");
const app = express();
const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'add-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

app.use(express.static(__dirname + '/'))
// addition
const add = (n1, n2) => {
    return n1 + n2;
}

// subtraction
const sub = (n1, n2) => {
    return n1 - n2;
}

// multiplication
const mul = (n1, n2) => {
    return n1 * n2;
}

// division
const div = (n1, n2) => {
    return n1 / n2;
}

// exponentiation
const exp = (n1, n2) => {
    return Math.pow(n1, n2);
}

// squareroot
const sqr = (n1, n2) => {
    const val = "Num 1 : " + Math.sqrt(n1) + " , Num 2 : " + Math.sqrt(n2);
    return val;

}

// modulo
const mod = (n1, n2) => {
    return n1 % n2;
}

// absolute
const abs = (n1, n2) => {
    const val = "Num 1 : " + Math.abs(n1) + " , Num 2 : " + Math.abs(n2);
    return val;
}

app.get('/', (req, res) => {
    res.render(index.html);
});


// addition get function
app.get("/add", (req, res) => {
    try {
        const n1 = req.query.n1;
        const n2 = req.query.n2;
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = add(parseFloat(n1), parseFloat(n2));

        res.json({ statuscode: 200, data: result, message: "Addition Successful" });
    } catch (error) {
        console.error(error)
        res.json({ statuscode: 500, msg: error.toString() })
    }
});

// subtraction get function
app.get("/sub", (req, res) => {
    try {
        const n1 = req.query.n1;
        const n2 = req.query.n2;
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for subtraction');
        const result = sub(parseFloat(n1), parseFloat(n2));
        res.json({ statuscode: 200, data: result, message: "Subtraction Successful" });
    } catch (error) {
        console.error(error)
        res.json({ statuscode: 500, msg: error.toString() })
    }
});

// multiplication get function
app.get("/mul", (req, res) => {
    try {
        const n1 = req.query.n1;
        const n2 = req.query.n2;
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for multiplication');
        const result = mul(parseFloat(n1), parseFloat(n2));
        res.json({ statuscode: 200, data: result, message: "Multiplication Successful" });
    } catch (error) {
        console.error(error)
        res.json({ statuscode: 500, msg: error.toString() })
    }
});

// division get function
app.get("/div", (req, res) => {
    try {
        const n1 = req.query.n1;
        const n2 = req.query.n2;
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for division');
        const result = div(parseFloat(n1), parseFloat(n2));
        res.json({ statuscode: 200, data: result, message: "Division Successful" });
    } catch (error) {
        console.error(error)
        res.json({ statuscode: 500, msg: error.toString() })
    }
});

// exponentiation get fuction
app.get("/exp", (req, res) => {
    try {
        const n1 = req.query.n1;
        const n2 = req.query.n2;
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for exponentiation');
        const result = exp(parseFloat(n1), parseFloat(n2));
        res.json({ statuscode: 200, data: result, message: "Exponentiation Successful" });
    } catch (error) {
        console.error(error)
        res.json({ statuscode: 500, msg: error.toString() })
    }
});

// squareroot get fuction
app.get("/sqr", (req, res) => {
    try {
        const n1 = req.query.n1;
        const n2 = req.query.n2;
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for squareroot');
        const result = sqr(parseFloat(n1), parseFloat(n2));
        res.json({ statuscode: 200, data: result, message: "Squareroot Successful" });
    } catch (error) {
        console.error(error)
        res.json({ statuscode: 500, msg: error.toString() })
    }
});

// modulo get fuction
app.get("/mod", (req, res) => {
    try {
        const n1 = req.query.n1;
        const n2 = req.query.n2;
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for modulo');
        const result = mod(parseFloat(n1), parseFloat(n2));
        res.json({ statuscode: 200, data: result, message: "Modulo Successful" });
    } catch (error) {
        console.error(error)
        res.json({ statuscode: 500, msg: error.toString() })
    }
});

// absolute get fuction
app.get("/abs", (req, res) => {
    try {
        const n1 = req.query.n1;
        const n2 = req.query.n2;
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for absolute');
        const result = abs(parseFloat(n1), parseFloat(n2));
        res.json({ statuscode: 200, data: result, message: "Absolute Successful" });
    } catch (error) {
        console.error(error)
        res.json({ statuscode: 500, msg: error.toString() })
    }
});


const port = 3041;
app.listen(port, () => {
    console.log("hello i'm listening to port " + port);
})