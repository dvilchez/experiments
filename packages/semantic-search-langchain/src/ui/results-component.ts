export class SearchResultList extends HTMLElement {
  private _results: { text: string; path: string; score: number }[] = [];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Called when the element is connected to the document
  connectedCallback() {
    this.render();
  }

  // Render the search results
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .result-item { 
          margin-bottom: 10px; 
          border-bottom: 1px solid #ccc; 
          padding-bottom: 10px; 
        }
        .result-text { 
          color: #333; 
          font-size: 14px; 
        }
        .result-score { 
          color: #666; 
          font-size: 12px; 
        }

        .start-message {
          text-align: center;
        }
      </style>
      <div>
        ${
          this._results.length > 0
            ? this._results
                .map(
                  (result) => `
          <div class="result-item">
            <div class="result-text">${result.text}</div>
            <div class="result-score">Score: ${result.score} - Path: ${result.path}</div>
          </div>
        `
                )
                .join("")
            : `<div class="start-message"> Start your search </div>`
        }
      </div>
    `;
  }

  hide() {
    this.style.display = "none";
  }

  show() {
    this.style.display = "block";
  }

  set results(value: { text: string; path: string; score: number }[]) {
    this._results = value;
    this.render();
  }
}
