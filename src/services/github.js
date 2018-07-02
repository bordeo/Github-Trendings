const fetchTrendingRepo = languageType => {
	const languageQuery = languageType ? "language:" + languageType : "";
	return fetch(
		"https://api.github.com/search/repositories?q=created:=>2011-01-01" +
			languageQuery +
			"&sort=stars&order=desc",
		{
			headers: {
				"Content-Type": "application/json"
			}
		}
	);
};

export default { fetchTrendingRepo };
