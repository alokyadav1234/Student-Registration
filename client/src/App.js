import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import StudentRegistration from '../src/components/StudentRegistration';
import RegistrationConfirmation from '../src/components/RegistrationConfirmation';
import RegistrationSuccessful  from '../src/components/RegistrationSuccessful';
import PaymentFailed from '../src/components/PaymentFailed';
import Welcome from '../src/components/Welcome';
import Profile from '../src/components/Profile';
import Login from '../src/components/Login';

function App() {
  return (
    <div>
    <BrowserRouter>
        <div className="App">
          
          <Route exact path="/" component={Login} />
          <Route path="/registration" component={StudentRegistration} />
          <Route path="/confirmation" component={RegistrationConfirmation} />
          <Route path="/success" component={RegistrationSuccessful} />
          <Route path="/fail" component={PaymentFailed} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/profile" component={Profile} />
        </div>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
