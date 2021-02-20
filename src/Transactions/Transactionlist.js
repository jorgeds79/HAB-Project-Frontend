import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import './Transactionlist.css'
import Transactions from "./Transactions";
import Transaction from "./Transaction";
import { useState } from "react";

function Transactionlist() {
    const login = useSelector(s => s.login)
    const [key, setKey] = useState(0)
    const reload = () => setKey(key+1)

    if (!login) {
        return <Redirect to="/" />
    }

    return (
        <div className="transactionsHome">
            <Transactions reload={key} />
            <Switch>
                <Route path="/user/mypanel/transactions/list/:id" exact>
                    <Transaction change={reload} />
                </Route>
            </Switch>
        </div>
    )
}

export default Transactionlist;