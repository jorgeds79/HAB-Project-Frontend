import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Chats from "./Chats";
import Conversacion from "./Conversacion";
import './Messenger.css'

function Messenger() {
    const login = useSelector(s => s.login)

    if (!login) {
        return <Redirect to="/" />
    }

    return (
        <div className="messenger">
            <Chats />
            <Switch>
                <Route path="/user/mypanel/messages-chats/chatlist/:id" exact>
                    <Conversacion />
                </Route>
            </Switch>
        </div>
    )
}

export default Messenger;