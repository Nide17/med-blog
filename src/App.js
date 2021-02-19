import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Posts from './components/Posts';
import Quiz from './components/Quiz';
import Contact from './components/Contact';
import About from './components/About';

// REDUX
import { Provider } from 'react-redux'
import store from './redux/store'
import Footer from './components/Footer';

const App = () => (
    <Provider store={store}>
        <Router>
            <Header />

            <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/quiz" component={Quiz} />
                <Route path="/contact" component={Contact} />
                <Route path="/about" component={About} />
            </Switch>
            <Footer />
        </Router>
    </Provider>
)

export default App;