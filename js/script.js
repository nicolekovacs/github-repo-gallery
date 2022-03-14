// Targeting the div that displays profile info
const profileInfo = document.querySelector(".overview");
const username = "nicolekovacs";
const repoList = document.querySelector(".repo-list");

const getData = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    userInfoDisplay(data);
};

getData();

const userInfoDisplay = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    profileInfo.append(div);
    fetchRepoList();
};

const fetchRepoList = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await res.json();
    repoInfoDisplay(repos);
};

fetchRepoList();

const repoInfoDisplay = function (repos) {
    for (const repo of repos) {
        const item = document.createElement("li");
        item.classList.add("repo");
        item.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(item);
    }
};

