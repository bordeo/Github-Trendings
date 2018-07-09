import React, { Component } from "react";
import Repo from "./components/Repo";
import logo from "./logo.svg";
import "./App.css";
import githubService from "./services/github";
import moment from "moment";

const label = "label";
const value = "value";
const languages = [
  {
    [label]: "All Language",
    [value]: "all"
  },
  {
    [label]: "Javascript",
    [value]: "javascript"
  },
  {
    [label]: "Ruby",
    [value]: "ruby"
  },
  {
    [label]: "Php",
    [value]: "php"
  }
];

const periods = [
  {
    [label]: "All time",
    [value]: moment()
      .subtract(10, "years")
      .format("YYYY-MM-DD")
  },
  {
    [label]: "Today",
    [value]: moment().format("YYYY-MM-DD")
  },
  {
    [label]: "7 days",
    [value]: moment()
      .subtract(7, "days")
      .format("YYYY-MM-DD")
  },
  {
    [label]: "1 months",
    [value]: moment()
      .subtract(1, "months")
      .format("YYYY-MM-DD")
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      loading: true,
      error: false,
      languageIndex: 0,
      periodIndex: 0
    };
  }

  fetchData = async () => {
    this.setState({
      loading: true,
      error: false
    });

    let res;
    try {
      res = await githubService.fetchTrendingRepo(
        languages[this.state.languageIndex].value,
        periods[this.state.periodIndex].value
      );
    } catch (e) {
      this.setState({ loading: false, error: e });
      return;
    }

    let repos = res.items;
    console.log(repos);
    this.setState({ loading: false, repos: repos });
  };

  componentDidMount() {
    this.fetchData(this.state.language);
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
      <option key={i} value={language}>
        {language}
      </option>
    );
  };

  renderOptions = (option, i) => {
    return (
      <option key={i} value={i}>
        {option.label}
      </option>
    );
  };

  handleLanguageChanges = event => {
    this.setState({ languageIndex: event.target.value }, this.fetchData);
  };

  handlePeriodChanges = event => {
    this.setState({ periodIndex: event.target.value }, this.fetchData);
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
        <select
          value={this.state.languageIndex}
          onChange={this.handleLanguageChanges}
        >
          {languages.map(this.renderOptions)}
        </select>
        <select
          value={this.state.periodIndex}
          onChange={this.handlePeriodChanges}
        >
          {periods.map(this.renderOptions)}
        </select>
        {content}
      </div>
    );
  }
}

export default App;
