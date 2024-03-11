import "./experiment";

export class ExperimentsList extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = `
			<style>
				.experiments-list {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
			</style>
			<div class="experiments-list">
				<portfolio-experiment url="#semantic-search" img="https://picsum.photos/300/300?random=1" title="Semantic search"></portfolio-experiment>
				<portfolio-experiment url="#enigma-machine" img="https://picsum.photos/300/300?random=2" title="Enigma machine"></portfolio-experiment>
			</div>
		`;
	}
}

customElements.define('experiments-list', ExperimentsList);

