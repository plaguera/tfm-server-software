import { CommentComponent } from "./comment-component";

export class TimelineComponent {

    public readonly element: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.textContent = 'Timeline';
        for (let i = 0; i < 5; i++)
            this.element.appendChild(new CommentComponent().element);
    }
}