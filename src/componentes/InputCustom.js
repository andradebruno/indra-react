import React, { Component } from "react";
import PubSub from "pubsub-js";

class InputCustom extends Component {
	constructor() {
		super();
		this.state = { msgErro: "" };
	}

	render() {
		return (
			<div className="pure-control-group">
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} min={this.props.min}
						step={this.props.step}  required readonly={this.props.readonly} />
				<span className="error"> {this.state.msgErro}</span>
			</div>
		);
	}

	componentDidMount() {
		PubSub.subscribe(
			"erro-validacao",
			function(topico, erro) {
				if (erro.field === this.props.name) {
					this.setState({ msgErro: erro.defaultMessage });
				}
			}.bind(this)
		);

		PubSub.subscribe(
			"limpa-erros",
			function(topico) {
				this.setState({ msgErro: "" });
			}.bind(this)
		);
	}
}

export default InputCustom;
