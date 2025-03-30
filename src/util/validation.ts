// Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export const validate = (validatableInputs: Validatable): string | null => {
    const { value, required, minLength, maxLength, min, max } = validatableInputs;

    if (required && value.toString().trim().length === 0) {
        return 'This field is required.';
    }
    if (minLength != null && typeof value === 'string' && value.length < minLength) {
        return `Minimum length is ${minLength} characters.`;
    }
    if (maxLength != null && typeof value === 'string' && value.length > maxLength) {
        return `Maximum length is ${maxLength} characters.`;
    }
    if (min != null && typeof value === 'number' && value < min) {
        return `Value must be at least ${min}.`;
    }
    if (max != null && typeof value === 'number' && value > max) {
        return `Value must not exceed ${max}.`;
    }
    return null; // Valid input
};