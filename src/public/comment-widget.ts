import { TimelineComponent } from "./timeline-component";

export class CommentWidget {

    public readonly element: HTMLElement;

    constructor() {
        this.element = document.getElementsByClassName("comment-widget")[0] as HTMLElement;
        this.loadCSS('http://localhost:3040/public/stylesheets/style.css');
        this.element.appendChild(new TimelineComponent().element);
    }

    loadCSS(url: string) {
        var link_tag = document.createElement('link');
        link_tag.setAttribute("type", "text/css");
        link_tag.setAttribute("rel", "stylesheet");
        link_tag.setAttribute("href", url);
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(link_tag);
    }
}

let instance: CommentWidget = new CommentWidget();