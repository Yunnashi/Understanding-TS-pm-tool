import Component from './base-component';
import { autoBind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { validate } from '../util/validation';

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
    
        // Clear previous error messages
        this.clearErrorMessages();
    
        let isValid = true;
    
        const titleError = validate({ value: titleValue, required: true });
        if (titleError) {
            this.showError(this.titleInputElement, titleError);
            isValid = false;
        }
    
        const descriptionError = validate({ value: descriptionValue, required: true, minLength: 5 });
        if (descriptionError) {
            this.showError(this.descriptionInputElement, descriptionError);
            isValid = false;
        }
    
        const mandayError = validate({ value: mandayValue, required: true, min: 1, max: 1000 });
        if (mandayError) {
            this.showError(this.mandayInputElement, mandayError);
            isValid = false;
        }
    
        if (!isValid) {
            return;
        }
    
        return [titleValue, descriptionValue, mandayValue];
    }
    
    private showError(inputElement: HTMLInputElement, message: string) {
        const errorElement = document.createElement('p');
        errorElement.textContent = message;
        errorElement.className = 'error-message';
        inputElement.insertAdjacentElement('afterend', errorElement);
    }
    
    private clearErrorMessages() {
        const errorMessages = this.element.querySelectorAll('.error-message');
        errorMessages.forEach((errorMessage) => errorMessage.remove());
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
