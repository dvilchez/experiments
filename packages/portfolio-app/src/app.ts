import "./experiments-list";
import "semantic-search-langchain";

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", () => {
    render();
  });
  render();
});

function render() {
  const projectsContainer = document.getElementById("projects-container");
  const hash = window.location.hash;
  if (hash === "#lang-chain") {
    const myComponentInstance = document.createElement(
      "semantic-search-langchain",
    );

    projectsContainer?.replaceChildren(myComponentInstance);
  } else {
    const myComponentInstance = document.createElement("experiments-list");

    projectsContainer?.replaceChildren(myComponentInstance);
  }
}
