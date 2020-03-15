export class CommentComponent {

    public readonly element: HTMLElement;

    constructor() {
        this.element = document.createElement('a');
        this.element.textContent = 'Comment';
    }
}