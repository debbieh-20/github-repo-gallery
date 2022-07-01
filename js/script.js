//selecting profile information div class
const overview = document.querySelector (".overview");
const username = "debbieh-20";
//to select the unordered lit to display the repos list
const repoList = document.querySelector (".repo-list");

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
  gitRepos();
};

const gitRepos = async function () {
  //sort repos by the most recenly used to last updated; show up to 100 repos per page at a time
  const fetchRepos = await 
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      const repoData = await fetchRepos.json();
      displayRepos(repoData);
};
//display info about your repos
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};
