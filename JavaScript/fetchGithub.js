/**
 * Fetch 是浏览器自带方法，这段代码在浏览器可运行
 */

// 请求用户信息
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

// 请求 Github 信息
function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`).then((response) =>
    response.json()
  );
}

// 根据 Github 信息显示头像
function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// 使用它们：
loadJson("https://zh.javascript.info/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
