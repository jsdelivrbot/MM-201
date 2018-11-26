
let DEBUG = true;

function getTemplate(aId) {
    let template = document.getElementById(aId);
    template = document.importNode(template.content, true);
    return template;
}
//------------------------------------------------------------------------------------------------------------------

function clearContainer() {
    let container = document.getElementById("divContainer");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
//------------------------------------------------------------------------------------------------------------------

function addToContainer(aView) {
    document.getElementById("divContainer").appendChild(aView);
}
//------------------------------------------------------------------------------------------------------------------

function log(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
}
//------------------------------------------------------------------------------------------------------------------
