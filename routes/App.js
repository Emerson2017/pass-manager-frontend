
import {
BrowserRouter as Router,
Switch,
Route,
Redirect,
} from "react-router-dom";


import Home from "./pages/index";
import Login from "./pages/Login";

function App() {
return (
	<>
    <Router>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />


        <Redirect to="/" />
        </Switch>
    </Router>
	</>
);
}

export default App;
