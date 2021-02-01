import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Posts from './components/Posts';
import Contact from './components/Contact';
import About from './components/About';


const App = () => (
    <Router>
        <Header />

        <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
        </Switch>
    </Router>
)

export default App;