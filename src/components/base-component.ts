// Component Base Class
// 抽象クラスなので、インスタンスを生成することはできない
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild as U;
        if(newElementId) this.element.id = newElementId;

        this.attach(insertAtStart);
    }

    // このクラスを継承して、サブクラスでconfigureとrenderContentの実装を強制する
    abstract configure(): void;
    abstract renderContent(): void;

    private attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtStart ? 'afterbegin' : 'beforeend',
            this.element
        );
    }
}