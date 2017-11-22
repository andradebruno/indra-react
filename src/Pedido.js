import React, { Component } from "react";
import $ from "jquery";
import PubSub from "pubsub-js";
import TratadorErros from "./TratadorErros";
import InputCustom from "./componentes/InputCustom";
import BtnCustom from "./componentes/BtnCustom";

class FormularioPedido extends Component {
	constructor(props) {
		super(props);
		this.initialState = {
			idLanche: "",
			alface: 0,
			bacon: 0,
			carne: 0,
			ovo: 0,
			queijo: 0,
			total: 0
			
		};
		this.state = this.initialState;
		this.enviaForm = this.enviaForm.bind(this);
		this.setIdLanche = this.setIdLanche.bind(this);
		this.setAlface = this.setAlface.bind(this);
		this.setBacon = this.setBacon.bind(this);
		this.setCarne = this.setCarne.bind(this);
		this.setOvo = this.setOvo.bind(this);
		this.setQueijo = this.setQueijo.bind(this);
		this.setTotal = this.setTotal.bind(this);
	}

	enviaForm(evento) {
		evento.preventDefault();
		$.ajax({
			url: "http://localhost:8080/api/pedidos",
			contentType: "application/json",
			dataType: "json",
			type: "post",
			data: JSON.stringify({
				idLanche: this.state.idLanche,
				alface: this.state.alface,
				bacon: this.state.bacon,
				carne: this.state.carne,
				ovo: this.state.ovo,
				queijo: this.state.queijo,
				total: this.state.total
			}),
			success: function(novaLista) {
				PubSub.publish("atualiza-lista-pedidos", novaLista);
				this.setState({
					idLanche: "",
					alface: "",
					bacon: "",
					carne: "",
					ovo: "",
					queijo: "",
					total: ""
				});
			}.bind(this),
			error: function(resposta) {
				if (resposta.status == 400) {
					new TratadorErros().publicaErros(resposta.responseJSON);
					if(this.state.idLanche == "") {
						this.setState({msgErro: " É necessário selecionar um lanche!"})
					}
				}
			},
			beforeSend: function() {
				PubSub.publish("limpa-erros", {});
			}
		});
	}

	change(evento) {
		evento.preventDefault();
		this.setIdLanche(evento);
		if (evento.target.value !== "") {
			this.setState({msgErro:""});
			$.ajax({
				url: "http://localhost:8080/api/lanche/" + evento.target.value,
				dataType: "json",
				success: function(ingredientes) {
					console.log(ingredientes);
					this.setState({
						alface: ingredientes[0].quantidadeIngrediente,
						bacon: ingredientes[1].quantidadeIngrediente,
						carne: ingredientes[2].quantidadeIngrediente,
						ovo: ingredientes[3].quantidadeIngrediente,
						queijo: ingredientes[4].quantidadeIngrediente
					});
				}.bind(this)
			});
		} else {
			this.setState(this.initialState);
		}
	}

	calculaTotal(evento) {
		$.ajax({
			url: "http://localhost:8080/api/lanche/calcula",
			contentType: "application/json",
			dataType: "json",
			type: "post",
			data: JSON.stringify({
				idLanche: this.state.idLanche,
				alface: this.state.alface,
				bacon: this.state.bacon,
				carne: this.state.carne,
				ovo: this.state.ovo,
				queijo: this.state.queijo
			}),
			success: function(resposta) {
				this.setState({ total: resposta });
			}.bind(this),
			error: function(resposta) {
				if (resposta.status == 400) {
					new TratadorErros().publicaErros(resposta.responseJSON);
					if(this.state.idLanche == "") {
						this.setState({msgErro: " É necessário selecionar um lanche!"})
					}
				}
			}.bind(this),
			beforeSend: function() {
				PubSub.publish("limpa-erros", {});
			}
		});
	}

	setIdLanche(evento) {
		this.setState({ idLanche: evento.target.value });
	}
	setAlface(evento) {
		this.setState({ alface: evento.target.value });
	}
	setBacon(evento) {
		this.setState({ bacon: evento.target.value });
	}
	setCarne(evento) {
		this.setState({ carne: evento.target.value });
	}
	setOvo(evento) {
		this.setState({ ovo: evento.target.value });
	}
	setQueijo(evento) {
		this.setState({ queijo: evento.target.value });
	}
	setTotal(evento) {
		this.setState({ total: evento.target.value });
	}

	render() {
		return (
			<div className="pure-form pure-form-aligned">
			<br />
				<form
					className="pure-form pure-form-aligned"
					onSubmit={this.enviaForm}
					method="post"
				>
					<div className="pure-control-group">
						<label htmlFor="idLanche">Lanche</label>

						<select
							id="idLanche"
							name="idLanche"
							value={this.state.idLanche}
							onChange={this.change.bind(this)}
							required
						>
							<option value="">Selecione</option>
							{this.props.lanches.map(lanche => {
								return (
									<option
										key={lanche.idLanche}
										value={lanche.idLanche}
									>
										{lanche.nomeLanche}
									</option>
								);
							})}
						</select>
						<span className="error">{this.state.msgErro}</span>
					</div>

					<InputCustom
						id="1"
						type="number"
						name="alface"
						value={this.state.alface}
						onChange={this.setAlface}
						min="0"
						step="any"
						label="Alface"
					/>
					<InputCustom
						id="2"
						type="number"
						name="bacon"
						value={this.state.bacon}
						onChange={this.setBacon}
						min="0"
						step="any"
						label="Bacon"
					/>

					<InputCustom
						id="3"
						type="number"
						name="carne"
						value={this.state.carne}
						onChange={this.setCarne}
						min="0"
						step="any"
						label="Hambúrger de carne"
					/>

					<InputCustom
						id="4"
						type="number"
						name="ovo"
						value={this.state.ovo}
						onChange={this.setOvo}
						min="0"
						step="any"
						label="Ovo"
					/>

					<InputCustom
						id="5"
						type="number"
						name="queijo"
						value={this.state.queijo}
						onChange={this.setQueijo}
						min="0"
						step="any"
						label="Queijo"
					/>

					<BtnCustom
						type="button"
						label="Calcula"
						onClick={this.calculaTotal.bind(this)}
					/>

					<InputCustom
						id="total"
						type="text"
						name="total"
						readonly="true"
						min="0"
						value={this.state.total}
						onChange={this.setTotal}
						step="any"
						label="Total"
					/>

					<BtnCustom type="submit" label="Gravar" />
				</form>
			</div>
		);
	}
}

class TabelaPedidos extends Component {
	render() {
		return (
			<div>
			<br />
				<table className="pure-table">
					<thead>
						<tr>
							<th>Nome Lanche</th>
							<th>Alface</th>
							<th>Bacon</th>
							<th>Hambúrger de Carne</th>
							<th>Ovo</th>
							<th>Queijo</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{this.props.pedidos.map(pedido => {
							return (
								<tr key={pedido.idPedido}>
									<td>{pedido.lanchePedido.nomeLanche}</td>
									{pedido.lanchePedido.ingredientesLanche.map(i => {
										return (
											<td key={i.idIngrediente}>{i.quantidadeIngrediente}</td>
										);
									})}
									<td>{pedido.totalPedido}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default class PedidoBox extends Component {
	constructor(props) {
		super(props);
		this.state = { lanches: [], pedidos: [] };
	}

	componentDidMount() {
		$.ajax({
			url: "http://localhost:8080/api/lanches",
			dataType: "json",
			success: function(lanches) {
				this.setState({ lanches: lanches });
			}.bind(this)
		});

		$.ajax({
			url: "http://localhost:8080/api/pedidos",
			dataType: "json",
			success: function(pedidos) {
				console.log(pedidos);
				this.setState({ pedidos: pedidos });
			}.bind(this)
		});

		PubSub.subscribe(
			"atualiza-lista-pedidos",
			function(topico, novaLista) {
				this.setState({ pedidos: novaLista });
			}.bind(this)
		);
	}

	render() {
		return (
			<div>
				<div className="header">
					<h1>Cadastro de Pedido</h1>
				</div>
				<div className="content" id="content">
					<FormularioPedido lanches={this.state.lanches} />

					<TabelaPedidos pedidos={this.state.pedidos} />
				</div>
			</div>
		);
	}
}
