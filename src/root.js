import "./components/my-custom-component/my-custom-component";

const rootTemplate = document.createElement("template");

rootTemplate.innerHTML = `
  <my-custom-component></my-custom-component>
`;

class AppRoot extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(rootTemplate.content.cloneNode(true));
  }
}

window.customElements.define('app-root', AppRoot);