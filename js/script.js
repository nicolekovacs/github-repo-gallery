// Targeting the div that displays profile info
const profileInfo = document.querySelector(".overview");
const username = "nicolekovacs";
const repoList = document.querySelector(".repo-list");
const repositories = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
    fetchRepoList(username);
};

const fetchRepoList = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await res.json();
    repoInfoDisplay(repos);
};

const repoInfoDisplay = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const item = document.createElement("li");
        item.classList.add("repo");
        item.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(item);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const getRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await getRepo.json();

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (const language in languageData) {
    languages.push(language);
}

    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add();
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    repositories.classList.add("hide");
    backButton.classList.remove("hide");
};

backButton.addEventListener("click", function () {
    repositories.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const search = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowercase = search.toLowerCase();

    for (const repo of repos) {
        const lowerCaseValue = repo.innerText.toLowerCase();
        if (lowerCaseValue.includes(lowercase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});