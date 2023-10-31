class ProjectComponent extends HTMLElement {
  connectedCallback(): void {
    this.innerHTML = "<div>Hello World!</div>";
  }
}

customElements.define("project-component", ProjectComponent);

export default ProjectComponent;
