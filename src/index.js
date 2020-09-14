import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NewSubmission from './components/new_submission'
import AllSubmission from './components/all_sumission'

ReactDOM.render(
    <>
     <Router>


    <Switch>
       <Route exact path="/" component={AllSubmission}/>
       <Route path="/admin" component={NewSubmission}/>
    </Switch>

    </Router>
    
   ,
   
    </>,document.getElementById('root')
);