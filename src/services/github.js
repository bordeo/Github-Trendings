const fetchTrendingRepo = async (language, period) => {
  let languageQuery = "";
  if (language && language !== "all") {
    languageQuery = `&language:${language}`;
  }
  let periodQuery = "";
  if (period) {
    periodQuery = `&q=created:>=${period}`;
  }

  const res = await fetch(
    "https://api.github.com/search/repositories?sort=stars&order=desc" +
      periodQuery +
      languageQuery,
    {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=0"
      }
    }
  );

  if (!res.ok) {
    throw Error(res.status + " - " + res.statusText);
  }
  const j = await res.json();

  if (typeof j.errors !== "undefined") {
    throw Error(j.errors[0].message);
  }
  return j;
};

export default { fetchTrendingRepo };
