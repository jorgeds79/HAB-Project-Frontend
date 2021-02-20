import logo from './logo.png';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './User/Login';
import Header from './Header';
import Register from './User/Register';
import Home from './Home';
import Search from './Search';
import Panel from './User/Panel/Panel';
import MyInfo from './User/Panel/MyInfo';
import Messenger from './Messenger/Messenger';
import Book from './Books/Book';
import Newchat from './Messenger/Newchat';
import { useState } from 'react';
import Newtransaction from './Transactions/Newtransaction';
import Transactionlist from './Transactions/Transactionlist';
import Updatepassword from './User/Updatepassword';

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
        <Route path="/mypanel" exact>
          <Panel />
        </Route>
        <Route path="/user/profile" exact>
          <MyInfo />
        </Route>
        <Route path="/user/password/update" exact >
          <Updatepassword />
        </Route>
        <Route path="/messages-chats/chatlist" >
          <Messenger />
        </Route>
        <Route path="/messages-chats/new" exact >
          <Newchat />
        </Route>
        <Route path="/book/detail/:id" exact >
          <Book />
        </Route>
        <Route path="/transactions/list" >
          <Transactionlist />
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
