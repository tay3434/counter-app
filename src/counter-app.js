import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 0;
    this.minNumber = 0;
    this.maxNumber = 30;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: {type: Number, reflect: true },
      minNumber: {type: Number},
      maxNumber: {type: Number}
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-l));
      }
      .wrapper {
        text-align: center;
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-8);
      }
      .counter{
        font-size: var(--ddd-font-size-l);
      }
      :host([counter="18"]) .counter {
        color: var(--ddd-theme-default-athertonViolet);
      }

      :host([counter="21"]) .counter {
        color: var(--ddd-theme-default-beaver70);
      }
      :host([counter="0"]) .counter {
        color: var(--ddd-theme-default-futureLime);
      }
      :host([counter="30"]) .counter {
        color: var(--ddd-theme-default-original87Pink);
      } 
     
      button {
        font-size: var(--ddd-font-size-s);
        padding: var(--ddd-spacing-2);
        background-color: var(--ddd-theme-default-slateMaxLight);
        border: 1px solid var(--ddd-theme-default-slateLight);
        border-radius: 8px;
      }

      button:hover {
        background-color: var(--ddd-theme-default-creekLight);
      }

      button:focus {
        outline: 2px solid var(--ddd-theme-default-creekTeal);
      }
      button:disabled {
        background-color: var(--ddd-theme-default-disabled);
      }
    `];
  }
  increment(){
    if (this.counter < this.maxNumber) { 
      this.counter++;
    }
  }
    
  decrement(){
    if (this.counter > this.minNumber) { 
      this.counter--;
  }
}
updated(changedProperties) {
  if (changedProperties.has('counter')) {
    if (this.counter === this.maxNumber) {
      this.makeItRain();
    }
  }
}
makeItRain() {
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
    setTimeout(() => {
      this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
    }, 0);
  });
}
  

  render() {
    return html`
<div class="wrapper">
  <div>${this.title}</div>
  <div class="counter">${this.counter}</div>
  <button @click="${this.increment}" ?disabled="${this.counter === this.maxNumber}">+</button>
  <button @click="${this.decrement}" ?disabled="${this.counter === this.minNumber}">-</button>
  <confetti-container id="confetti"></confetti-container>
  <slot></slot>
</div>
`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);