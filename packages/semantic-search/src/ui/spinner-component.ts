export class SpinnerElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed; /* Fixed position */
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
          backdrop-filter: blur(5px); /* Blurry background */
          z-index: 1000; /* High z-index to be on top */
        }

        .spinner {
          border: 4px solid rgba(0,0,0,.1);
          width: 50px; /* Larger spinner */
          height: 50px;
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 1s ease infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="spinner"></div>
    `;
  }
}
