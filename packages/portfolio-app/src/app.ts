import "./experiments-list";
import "semantic-search";

// export {};

//add event listener to catch navigation using #
document.addEventListener("DOMContentLoaded", () => {
	window.addEventListener("hashchange", () => {
		const projectsContainer = document.getElementById("projects-container");
		const hash = window.location.hash;
		if (hash === "#semantic-search") {
			const myComponentInstance = document.createElement("semantic-search");

			projectsContainer?.replaceChildren(myComponentInstance);
		} else {
			const myComponentInstance = document.createElement("experiments-list");

			projectsContainer?.replaceChildren(myComponentInstance);
		}
	});
});

