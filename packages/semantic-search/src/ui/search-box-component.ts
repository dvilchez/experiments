export class SearchBox extends HTMLElement {
  private _onSearch: (query: string) => Promise<void>;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  // Render the search box and button
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .search-container {
          margin: 10px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          text-align: center;
        }
        .search-input {
          padding: 8px 15px;
          margin-right: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .search-button {
          padding: 8px 15px;
          background-color: #4285f4;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .search-button:hover {
          background-color: #357ae8;
        }
      </style>
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search...">
        <button class="search-button">Search</button>
      </div>
    `;

    this.shadowRoot
      .querySelector(".search-button")
      .addEventListener("click", () => {
        const input = this.shadowRoot.querySelector(
          ".search-input"
        ) as HTMLInputElement;
        this.handleSearch(input.value);
      });
  }

  // Handle the search button click
  handleSearch(query: string) {
    if (this._onSearch) {
      this._onSearch(query);
    } else {
      // Default handling or do nothing
      console.log(query);
    }
  }

  set onSearch(callback: (query: string) => Promise<void>) {
    this._onSearch = callback;
  }
}
