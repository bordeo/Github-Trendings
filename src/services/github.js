const fetchTrendingRepo = (language, period) => {
  const languageQuery =
    language !== undefined && language !== "all" ? "&language:" + language : "";
  const periodQuery = period !== undefined ? "&q=created:>=" + period : "";
  return fetch(
    "https://api.github.com/search/repositories?sort=stars&order=desc" +
      periodQuery +
      languageQuery,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export default { fetchTrendingRepo };
