class SemanticSearch extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      .search-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      }
      #searchInput {
        width: 300px;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      #searchButton {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        background-color: #4285F4;
        color: white;
        cursor: pointer;
      }
      #results {
        margin-top: 20px;
        width: 100%;
      }
    `;

    const container = document.createElement("div");
    container.setAttribute("class", "search-container");

    const input = document.createElement("input");
    input.type = "text";
    input.id = "searchInput";
    input.placeholder = "Search...";

    const button = document.createElement("button");
    button.id = "searchButton";
    button.textContent = "Search";

    const results = document.createElement("div");
    results.id = "results";

    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(results);

    shadow.appendChild(style);
    shadow.appendChild(container);

    button.addEventListener("click", () => {
      const searchQuery = input.value;
      // Implement your search logic here
      results.innerHTML = `Results for "${searchQuery}"`;
    });
  }
}

customElements.define("semantic-search", SemanticSearch);
