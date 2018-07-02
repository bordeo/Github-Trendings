import React, { Component } from "react";
import Repo from "./components/Repo";
import logo from "./logo.svg";
import "./App.css";
import githubService from "./services/github";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			repos: [],
			loading: true,
			error: false,
			languages: ["javascript", "ruby", "java"]
		};
	}

	fetchData = async language => {
		this.setState({
			loading: true,
			error: false
		});

		let res;
		try {
			res = await githubService.fetchTrendingRepo(language);
		} catch (e) {
			this.setState({ loading: false, error: e });
			return;
		}
		if (!res.ok) {
			throw Error(res.status + " - " + res.statusText);
		}
		const j = await res.json();
		if (typeof j.errors !== "undefined") {
			throw Error(j.errors[0].message);
		}
		let repos = j.items;
		this.setState({ loading: false, repos: repos });
	};

	componentDidMount() {
		this.fetchData();
	}

	renderRepo = (repo, i) => {
		return (
			<Repo
				key={repo.id}
				id={repo.id}
				htmlUrl={repo.html_url}
				stargazersUrl={repo.stargazers_url}
				fullName={repo.full_name}
				forksUrl={repo.forks_url}
				stargazersCount={repo.stargazers_count}
				forksCount={repo.forks_count}
			/>
		);
	};

	renderLanguagesOption = (language, i) => {
		return (
			<option key="i" value={language}>
				{language}
			</option>
		);
	};

	handleSelectChanges = event => {
		this.fetchData(this.state.value);
	};

	render() {
		let content;
		if (this.state.loading) {
			content = <div>Loading...</div>;
		} else {
			if (this.state.error) {
				content = <div>Errore: {this.state.error.message}</div>;
			} else if (this.state.repos.length > 0) {
				content = (
					<div className="Content">
						<ul className="Issue-list">
							{this.state.repos.map(this.renderRepo)}
						</ul>
					</div>
				);
			} else {
				content = <div>Nessun repo trovato</div>;
			}
		}

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Trending Repos</h1>
				</header>
				<select value={this.state.value} onChange={this.handleSelectChanges}>
					{this.state.languages.map(this.renderLanguagesOption)}
				</select>
				{content}
			</div>
		);
	}
}

export default App;
