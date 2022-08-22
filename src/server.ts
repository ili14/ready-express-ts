import * as dotenv from "dotenv";

dotenv.config();
import express, {
    ErrorRequestHandler,
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import serveIndex from "serve-index";
import mongoose from "mongoose";
import chalk from "chalk";
import timeout from "connect-timeout";
import Routes from "./Routes/Routes";
import ApiResponseFormat from "./Classes/ApiResponseFormat";

const port = process.env.PORT || process.env.MY_PORT;

const app = express();
mongoose
    .connect("mongodb://localhost:27017/blogdb")
    .catch(err => console.log(err));

app.use(timeout(5000));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/public", express.static(__dirname + "/../public"));
app.use("/public", serveIndex(__dirname + "/../public"));

process.on("unhandledRejection", (error: Error) => {
    console.log(chalk.red.underline(error + " 👇"));
    console.log(chalk.hex("#f4b7c1")(error.stack));
});

const haltOnTimedout: RequestHandler = (req, res, next) => {
    if (!req.timedout) {
        console.log("haltOnTimedout");
        next();
    }
};
const logErrors: ErrorRequestHandler = function (err, req, res, next) {
    let error: any = err;
    if (typeof err.clientError !== "undefined") error = err.originalError;
    console.log(
        chalk.red.underline("Error -> ") + chalk.hex("#fff")(error + " 👇")
    );
    console.log(chalk.hex("#f4b7c1")(error.stack));
    if (req.timedout) return next("request time out.");
    next(err);
};
// CHANGED this function
const clientErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).json(
            ApiResponseFormat.unSuccess500Error("Something failed!")
        );
    } else {
        next(err);
    }
};
// CHANGED this function
const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
    let clientError: any = err;
    if (typeof err.clientError !== "undefined") clientError = err.clientError;

    res.status(500);
    res.json(ApiResponseFormat.unSuccess500Error(clientError));
};

Routes.map(item => {
    app.use(item.prefix, item.router);
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(haltOnTimedout);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
