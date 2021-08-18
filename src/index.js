import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ImageProcess from "./ImageProcess";
import ImageOutput from "./ImageOutput";
import AnalysisOutput from "./AnalysisOutput";
import App from "./App";


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/ImageProcess" component={ImageProcess} />
            <Route path="/ImageOutput" component={ImageOutput} />
            <Route path="/AnalysisOutput" component={AnalysisOutput} />
        </Switch>
    </BrowserRouter>,
    rootElement
);