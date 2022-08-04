const input = document.querySelector('.get-repos input'),
getButton = document.querySelector('.get-button'),
reposData = document.querySelector('.show-data');

getButton.onclick = () => {
  getRepos();
}

const getRepos = () => {
  if (input.value == "") {
    reposData.innerHTML = '<span>Please write Github Username.</span>';
  } else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
    .then((response) => response.json())
    .then((data) => {
      reposData.innerHTML = '';
      data.forEach((repo) => {
        let mainDiv = document.createElement('div'),
        repoName = document.createTextNode(repo.name);
        mainDiv.appendChild(repoName);
        
        let url = document.createElement('a');
        let urlTxt = document.createTextNode('Visit');
        url.appendChild(urlTxt);
        url.href = `https://github.com/${input.value}/${repo.name}`;
        url.setAttribute('target', '_blank');
        mainDiv.appendChild(url);
        
        let starsSpan = document.createElement('span'),
        starsTxt = document.createTextNode(`Stars ${repo.stargazers_count}`);
        starsSpan.appendChild(starsTxt);
        mainDiv.appendChild(starsSpan);
        
        mainDiv.className = 'repo-box';
        reposData.appendChild(mainDiv);
      })
    });
  }
}