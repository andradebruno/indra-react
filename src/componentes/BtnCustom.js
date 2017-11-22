import React, { Component } from "react";

class BtnCustom extends Component {
	render() {
		return (
			<div className="pure-control-group">
				<label />
				<button type={this.props.type} onClick={this.props.onClick} className="pure-button pure-button-primary">
					{this.props.label}
				</button>
			</div>
		);
	}
}

export default BtnCustom;