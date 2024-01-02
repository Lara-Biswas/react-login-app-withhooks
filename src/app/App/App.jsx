// Import necessary dependencies
import React, { useState } from "react";
import { Signup } from "../../components/Signup";
import { Login } from "../../components/Login";
import { MovieList } from "../../components/Movielist";
import { CompanyInfo } from "../../components/CompanyInfo";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";

// App component
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {loggedIn && (
              <>
                <li>
                  <Link to="/movieList">Movie List</Link>
                </li>
                <li>
                  <Link to="/companyInfo">Company Info</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Route path="/signup" component={Signup} />
        <Route
          path="/login"
          render={() => <Login setLoggedIn={setLoggedIn} />}
        />
        <Route path="/movieList" component={MovieList} />
        <Route path="/companyInfo" component={CompanyInfo} />

        {/* Redirect to login if not logged in */}
        {!loggedIn && <Redirect to="/login" />}
      </div>
    </Router>
  );
};

export default App;
