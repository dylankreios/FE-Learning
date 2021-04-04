/**
 * Http 请求错误类
 */
class HttpsError extends Error {
  constructor(response) {
    super(`${response.status} : ${response.url}`);
    this.name = this.constructor.name;
    this.response = response;
  }
}

// 请求用户信息
function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpsError(response);
    }
  });
}

// 请求 Github 信息
function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`)
    .then((user) => {
      console.log(user.name);
      return user;
    })
    .catch((error) => {
      // 踩坑 -> error 是 HttpError 类型，没有 status 属性，必须加 response
      if (error instanceof HttpsError && error.response.status == 404) {
        console.log("no such user");
        let user = prompt("Enter a name custom?", "iliakan");
        return loadGithubUser(user);
      } else {
        throw error;
      }
    });
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

loadJson("https://zh.javascript.info/article/promise-chaining/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
