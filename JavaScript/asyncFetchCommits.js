async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    // github 需要任意的 user-agent header
    const response = await fetch(url, {
      headers: { "User-Agent": "Our script" },
    });

    // 响应的是 JSON（commits 数组）
    const body = await response.json();

    // 前往下一页的 URL 在 header 中
    let nextPage = response.headers.get("Link").match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    // 一个接一个地 yield commit，直到最后一页
    for (let commit of body) {
      yield commit;
    }
  }
}

(async () => {
  let count = 0;
  for await (const commit of fetchCommits(
    "javascript-tutorial/en.javascript.info"
  )) {
    console.log(commit.author.login);
    // 在获取了 100 个 commit 时停止
    if (++count == 100) {
      break;
    }
  }
})();
