var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn0");

btn.addEventListener("click", function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://watikarosm.github.io/animals-' + pageCounter + '.json')
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.onload = function() {
        if (ourRequest.status >= 200 && ourRequest.status < 400)
            var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.onerror = function() {
        console.log("Connection error");
    };
    ourRequest.send();
    pageCounter++;
    if (pageCounter > 2) {
        btn.classList.add("hide-me");
    };
});

function renderHTML(data) {
    var htmlString = "";

    for (let i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + " likes ";
        let k = 1;
        for (let j = 0; j < data[i].favFood.likes.length; j++) {
            htmlString += data[i].favFood.likes[j];
            if (data[i].favFood.likes.length === 2 && k === data[i].favFood.likes.length - 1) {
                htmlString += " and ";
            } else if (data[i].favFood.likes.length === 1) {
                htmlString += ". ";
            } else {
                if (k < data[i].favFood.likes.length - 1) {
                    //console.log(k, j, data[i].favFood.likes.length);
                    htmlString += ", ";
                } else if (k === data[i].favFood.likes.length - 1) {
                    htmlString += ", and ";
                    //console.log(k, j, data[i].favFood.likes.length);
                } else {
                    htmlString += ". ";
                }
            }
            k += 1;
        }
        htmlString += " But dislikes ";
        let l = 1;
        for (let j = 0; j < data[i].favFood.dislikes.length; j++) {
            htmlString += data[i].favFood.dislikes[j];
            if (data[i].favFood.dislikes.length === 2 && l === data[i].favFood.dislikes.length - 1) {
                htmlString += " and ";
            } else if (data[i].favFood.dislikes.length === 1) {
                htmlString += ". ";
            } else {
                if (l < data[i].favFood.dislikes.length - 1) {
                    //console.log(l, j, data[i].favFood.dislikes.length);
                    htmlString += ", ";
                } else if (l === data[i].favFood.dislikes.length - 1) {
                    htmlString += ", and ";
                    //console.log(l, j, data[i].favFood.dislikes.length);
                } else {
                    htmlString += ". ";
                }
            }
            l += 1;
        }
        htmlString += "</p>";

    }
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
}