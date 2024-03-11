export class PortfolioExperiment extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                .portfolio-card {
                    width: 100%;
                    max-width: 300px;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    border-radius: 10px;
                    text-align: center;
                    margin: 20px;
                }
                .portfolio-card img {
                    width: 100%;
                    height: auto;
                    border-radius: 10px;
                }
                .portfolio-card h3 {
                    margin: 10px 0;
                }
            </style>
            <div class="portfolio-card">
                <img src="" alt="project image">
                <a><h3>Project Title</h3></a>
            </div>
        `;
    }

    connectedCallback() {
        const img = this.getAttribute('img');
        const title = this.getAttribute('title');
        const link = this.getAttribute('url')
        this.shadowRoot.querySelector('img').src = img;
        this.shadowRoot.querySelector('h3').innerText = title;
        this.shadowRoot.querySelector('a').href = link;
    }
}

customElements.define('portfolio-experiment', PortfolioExperiment);
