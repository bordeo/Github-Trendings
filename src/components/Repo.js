import React, { Component } from "react";

export default class Repo extends Component {
	render() {
		const { htmlUrl } = this.props;
		return (
			<li key={this.props.id}>
				<a target="_blank" href={htmlUrl}>
					<span>{this.props.fullName}</span>
				</a>
				<a target="_blank" href={this.props.stargazersUrl}>
					<span>{this.props.stargazersCount}</span>
				</a>
				<a target="_blank" href={this.props.forksUrl}>
					<span>{this.props.forksCount}</span>
				</a>
			</li>
		);
	}
}
