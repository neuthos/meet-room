import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home, Detail, BookRoom } from "./pages";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Route path="/book/:id">
          <BookRoom />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
