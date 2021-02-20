import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './User/Login';
import Header from './Header';
import Register from './User/Register';
import Home from './Home';
import Search from './Search';
import Book from './Books/Book';
import Newchat from './Messenger/Newchat';
import Newtransaction from './Transactions/Newtransaction';
import PanelList from './User/Panel/PanelList';

function App() {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/search/:level?">
          <Search />
        </Route>
        <Route path="/user/mypanel" >
          <PanelList />
        </Route>
        <Route path="/messages-chats/new" exact >
          <Newchat />
        </Route>
        <Route path="/book/detail/:id" exact >
          <Book />
        </Route>
        <Route path="/transactions/new" exact >
          <Newtransaction />
        </Route>
        <Route path="/">No existe...</Route>
      </Switch>
    </div>
  );
}

export default App;
