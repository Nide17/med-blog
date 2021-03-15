import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Posts from './components/posts/Posts';
import Contact from './components/Contact';
import About from './components/About';
import Placeholder from './components/placeholder/Placeholder';

// REDUX
import { Provider } from 'react-redux'
import store from './redux/store'
import Footer from './components/footer/Footer';

const Questions = lazy(() => import('./components/questions/Questions'));

const App = () => (
    <Provider store={store}>
        <Router>
            <Header />

            <Switch>
                <Route exact path="/" component={Posts} />

                <Route exact path="/questions">
                    <Suspense fallback={<div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>}>
                        <Questions />
                    </Suspense>
                </Route>
                
                <Route exact path="/questions" component={Questions} />
                <Route path="/contact" component={Contact} />
                <Route path="/about" component={About} />
                <Route path="/ourself" component={Placeholder} />
                <Route path="/news" component={Placeholder} />
                <Route path="/faqs" component={Placeholder} />
                <Route path="/disclaimer" component={Placeholder} />
                <Route path="/privacy" component={Placeholder} />
                <Route path="/webmaster" component={Placeholder} />
                <Route path="/questions" component={Placeholder} />
                <Route path="/tips" component={Placeholder} />
            </Switch>
            <Footer />
        </Router>
    </Provider>
)

export default App;