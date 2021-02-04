import styles from './my-custom-component.css';

const templateElement = document.createElement('template');
const styleElement = document.createElement('style');

templateElement.innerHTML = `
  <p>Hello, World!</p>
`;

styleElement.appendChild(document.createTextNode(styles));

class MyCustomComponent extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(templateElement.content.cloneNode(true));
    this._shadow.appendChild(styleElement);
  }
}

window.customElements.define('my-custom-component', MyCustomComponent);