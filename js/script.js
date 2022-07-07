//selecting profile information div class
const overview = document.querySelector (".overview");
const username = "debbieh-20";
//to select the unordered lit to display the repos list
const repoList = document.querySelector (".repo-list");
//selects the section with class of repos
const allReposContainer = document.querySelector(".repos");
//selects the section with a class of repo-data where the individual repo data will appear
const repoData = document.querySelector(".repo-data");
//selects the back to repo gallery button
const viewReposButton = document.querySelector(".view-repos");
//selects the input with te Search by Name placeholder
const filterInput = document.querySelector(".filter-repos");

//fetch api json data
const gitUserInfo = async function () {
  //fetch api and target the users endpoint; use a template literal to add the global username variable to the endpoint
  const userInfo = await fetch(`https://api.github.com/users/${username}`); //added a $ character in front of the variable name to create a placeholder

  //resolve the json response
  const data = await userInfo.json();
  // call the function displaying the user information
  displayUserInfo(data);
};

gitUserInfo();
  
  // a new function to display the fetched user information on the page. Accepts the JSON data as a parameter.

const displayUserInfo = function(data) {
  //create a new div and give it a class of 'user-info'
  const div = document.createElement("div");
  div.classList.add("user-info");
  //populate the div with the elements for figure, image and paragraphs
  div.innerHTML = 
  `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
  gitRepos(username);
};

const gitRepos = async function (username) {
  //sort repos by the most recenly used to last updated; show up to 100 repos per page at a time
  const fetchRepos = await 
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      const repoData = await fetchRepos.json();
      displayRepos(repoData); 
};
//display info about your repos
const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

//add a click event on the unordered list
repoList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

//create a function to get specific repo info
const getRepoInfo = async function (repoName) {
  const fetchInfo = await
    fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

//get languages and create an array of languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    const languages = [];
      for (const language in languageData) {
      languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
};

//create a function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
  viewReposButton.classList.remove("hide");
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  allReposContainer.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(",")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrernoopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
  };
//add event listener for repo gallery button
  viewReposButton.addEventListener("click", function () { 
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
  });

  //create dynamic search
  filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos) {
      const repoLowerText = repo.innerText.toLowerCase();
      if (repoLowerText.includes(searchLowerText)) {
        repo.classList.remove("hide");
      } else {
        repo.classList.add("hide");
      }
     }
  });



