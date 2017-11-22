import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import PedidoBox from "./Pedido";
import Home from "./Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Root = () => (
	<BrowserRouter>
		<App>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/pedido" component={PedidoBox} />
			</Switch>
		</App>
	</BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
