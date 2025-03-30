import Component from './base-component.js';
import { autoBind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import { validate } from '../util/validation.js';

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    mandayInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.mandayInputElement = this.element.querySelector('#manday')! as HTMLInputElement;
        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const titleValue = this.titleInputElement.value;
        const descriptionValue = this.descriptionInputElement.value;
        const mandayValue = Number(this.mandayInputElement.value);
        if(
            !validate({ value: titleValue, required: true }) ||
            !validate({ value: descriptionValue, required: true, minLength: 5 }) ||
            !validate({ value: mandayValue, required: true, min: 1, max: 1000 })
        ) {
            alert('Invalid input, please try again!');
        } else {
            return [titleValue, descriptionValue, mandayValue];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.mandayInputElement.value = '';
    }

    @autoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)) {
            const [title, desc, manday] = userInput;
            projectState.addProject(title, desc, manday);
            this.clearInputs();
        }
    }
}
