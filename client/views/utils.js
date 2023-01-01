function emptyDOM (elem) {
    while (elem.firstChild) 
        elem.removeChild(elem.firstChild);
}

function createDOM (htmlString) {
    let template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
}

export { createDOM, emptyDOM };