import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import MyInfo from "./MyInfo";
import Panel from "./Panel";
import Updatepassword from "../Updatepassword";
import Messenger from "../../Messenger/Messenger";
import Transactionlist from "../../Transactions/Transactionlist";
import './PanelList.css'
import MyBooks from "../../Books/MyBooks";
import Bookdetail from "../../Books/Bookdetail";

function PanelList() {
    const login = useSelector(s => s.login)

    if (!login) {
        return <Redirect to="/" />
    }

    return (
        <div className="panelList">
            <Panel />
            <Switch>
                <Route path="/user/mypanel/profile/:id" exact>
                    <MyInfo />
                </Route>
                <Route path="/user/mypanel/transactions/list" >
                    <Transactionlist />
                </Route>
                <Route path="/user/mypanel/mybooks" >
                    <MyBooks />
                </Route>
                <Route path="/user/mypanel/bookdetail/:id" exact >
                    <Bookdetail />
                </Route>
                <Route path="/user/mypanel/messages-chats/chatlist" >
                    <Messenger />
                </Route>
                <Route path="/user/mypanel/password/update" exact >
                    <Updatepassword />
                </Route>
            </Switch>
        </div>
    )
}

export default PanelList;