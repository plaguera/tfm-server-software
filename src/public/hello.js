//var y = document.createElement("A");
//y.textContent = "HOLA";
//y.href = '#'

class CommentComponent {
    constructor() {
        this.element = document.createElement('a');
        this.element.textContent = 'Comment';
    }
}

class TimelineComponent {
    constructor() {
        this.element = document.createElement('div');
        this.element.textContent = 'Timeline';
        let i;
        for (i = 0; i < 5; i++)
            this.element.appendChild(new CommentComponent().element);
    }
}

class CommentWidget {
    constructor() {
        this.root = document.getElementsByClassName("comment-widget")[0];
        this.loadCSS('http://localhost:3040/style.css');
        this.root.appendChild(new TimelineComponent().element);
    }

    loadCSS(url) {
        var link_tag = document.createElement('link');
        link_tag.setAttribute("type", "text/css");
        link_tag.setAttribute("rel", "stylesheet");
        link_tag.setAttribute("href", url);
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(link_tag);
    }
}

var x = new CommentWidget();