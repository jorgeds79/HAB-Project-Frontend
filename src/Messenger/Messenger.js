import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Chats from "./Chats";
import Conversacion from "./Conversacion";
import './Messenger.css'
import { useState } from "react";

function Messenger() {
    const login = useSelector(s => s.login)
    const [key, setKey] = useState(0)
    const reload = () => setKey(key+1)

    if (!login) {
        return <Redirect to="/" />
    }

    return (
        <div className="messenger">
            <Chats reload={key} />
            <Switch>
                <Route path="/user/mypanel/messages-chats/chatlist/:id" exact>
                    <Conversacion change={reload} />
                </Route>
            </Switch>
        </div>
    )
}

export default Messenger;