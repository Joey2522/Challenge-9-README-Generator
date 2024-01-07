// TODO: Create a function to generate markdown for README
function generateMarkdown(data, userInfo) {
  return `# ${data.title}

  ## Repo Name
  ${data.repo}
  
  ## Description
  ${data.description}

  ## Installation
  ${data.installation}

  ## Motivation
  ${data.motivation}

  ## What Problem Does This Project Solve
  ${data.problem}

  ## What I Learned
  ${data.learn}

  ## Instructions
  ${data.instructions}

  ## Contributors
  ${data.collaborators}

  ## My GitHub
  "https://github.com/${data.username}"

  ## License
  ${data.license}

  ## Questions?

  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" width="40%" />

  If you have any questions please contact me with the information below:

  GitHub: [@${userInfo.login}](${userInfo.url})
  Email: ${userInfo.email}

`;
}

module.exports = generateMarkdown;
