import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Header from './components/Header';
import Contact from './components/Contact';
import About from './components/About';
import Placeholder from './components/placeholder/Placeholder';

// REDUX
import { Provider } from 'react-redux'
import store from './redux/store'
import Footer from './components/footer/Footer';
import CreateQuestions from './components/questions/CreateQuestions';

import { loadUser } from './redux/auth/auth.actions'
import SingleCategory from './components/categories/SingleCategory';
// import SingleQuiz from './components/quizes/SingleQuiz';
import QuizQuestions from './components/quizes/QuizQuestions';

const Questions = lazy(() => import('./components/questions/Questions'));
const Webmaster = lazy(() => import('./components/webmaster/Webmaster'));
const Posts = lazy(() => import('./components/posts/Posts'));

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser())
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Header />

                <Switch>
                    <Route exact path="/">
                        <Suspense fallback={<div className="p-5 m-5 d-flex justify-content-center align-items-center">
                            <Spinner style={{ width: '10rem', height: '10rem' }} />{' '}
                        </div>}>
                            <Posts />
                        </Suspense>
                    </Route>

                    <Route exact path="/questions">
                        <Suspense fallback={<div className="p-5 m-5 d-flex justify-content-center align-items-center">
                            <Spinner style={{ width: '10rem', height: '10rem' }} />{' '}
                        </div>}>
                            <Questions />
                        </Suspense>
                    </Route>

                    <Route exact path="/category/:categoryId" component={SingleCategory} />
                    {/* <Route exact path="/view-quiz/:quizId" component={SingleQuiz} /> */}
                    <Route exact path="/view-quiz/:quizId" component={QuizQuestions} />
                    <Route exact path="/questions-create/:quizId" component={CreateQuestions} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/about" component={About} />
                    <Route path="/ourself" component={Placeholder} />
                    <Route path="/news" component={Placeholder} />
                    <Route path="/faqs" component={Placeholder} />
                    <Route path="/disclaimer" component={Placeholder} />
                    <Route path="/privacy" component={Placeholder} />

                    <Route exact path="/webmaster">
                        <Suspense fallback={<div className="p-5 m-5 d-flex justify-content-center align-items-center">
                            <Spinner style={{ width: '10rem', height: '10rem' }} />{' '}
                        </div>}>
                            <Webmaster />
                        </Suspense>
                    </Route>

                    <Route path="/questions" component={Placeholder} />
                    <Route path="/tips" component={Placeholder} />
                </Switch>
                <Footer />
            </Router>
        </Provider>
    )
}

export default App;