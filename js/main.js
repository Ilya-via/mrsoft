var allInfo = {
    list: '',
    catsLinks: [],
    catsBio: [],
    catsImgLinks: []
}

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

function doCORSRequest(options) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function () {

        allInfo.list = JSON.parse(x.response);
        createListItems(allInfo.list.data);

    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
}

doCORSRequest({
    method: 'POST',
    url: 'https://www.mrsoft.by/tz20/list.json',
});


var nameMassive = [];
function createListItems(news) {
    var itemsBlock = document.querySelector(".main__list-items");

    for (i = 0; i < news.length; i++) {
        nameMassive.push(news[i].name);
    }
    nameMassive.sort();
    for (var i = 0; i < nameMassive.length; i++) {
        for (var a = 0; a < nameMassive.length; a++) {
            if (nameMassive[i] == allInfo.list.data[a].name) {
                allInfo.list.data.push(allInfo.list.data[a]);
            }
        }
    }
    allInfo.list.data.splice(0, nameMassive.length);

    for (var i = 0; i < news.length; i++) {
        var name = news[i].name;
        var shortInfo = news[i].shortInfo;
        var itemId = news[i].id;
        var el = document.createElement('div');
        el.setAttribute("id", itemId);
        el.setAttribute("class", "item");
        el.classList.add("clickable");
        el.innerHTML = '<div class="container__name-shortInfo">' + '<h3>' + name + '</h3>' + '<p>' + shortInfo + '</p>' + '</div>' + '<p class="exit"' + 'id="' + allInfo.list.data[i].id + '_cross' + '"' + '>' + 'X' + '</p>';
        itemsBlock.appendChild(el);
    }

    getCatsLinks();
    getCatsBio();
}

function getCatsLinks() {
    for (var i = 0; i < allInfo.list.data.length; i++) {
        allInfo.catsLinks.push(allInfo.list.basepath + allInfo.list.data[i].more);
    }
}

function getCatsBio() {
    for (var i = 0; i < allInfo.catsLinks.length; i++) {

        function doCORSRequestBio(options) {
            var x = new XMLHttpRequest();
            x.open(options.method, cors_api_url + options.url, true);
            x.onload = x.onerror = function () {


                allInfo.catsBio.push(JSON.parse(x.response));

            };
            if (/^POST/i.test(options.method)) {
                x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
            x.send(options.data);
        }

        var urlField = allInfo.catsLinks[i];

        doCORSRequestBio({
            method: 'POST',
            url: urlField,
        });
    }

}

setTimeout(function () {
    for (var i = 0; i < 13; i++) {
        allInfo.catsImgLinks.push(allInfo.list.basepath + allInfo.catsBio[i].pic);
    }
    for (var i = 0; i < 13; i++) {

        var itemsBlock = document.querySelector(".main__item-info");
        var el = document.createElement('div');
        var itemname = allInfo.list.data[i].name;
        var shortItemInfo = allInfo.list.data[i].shortInfo;
        var bio = allInfo.catsBio[i].bio;
        el.setAttribute("class", allInfo.catsBio[i].id);
        el.classList.add("invisible");
        el.innerHTML = '<h2>' + itemname + '</h2>' + '<h3>' + shortItemInfo + '</h3>' + '<p>' + bio + '</p>' + '<img src="' + allInfo.catsImgLinks[i] + '" alt="cat" class="photo"> ';
        itemsBlock.appendChild(el);
    }
    changeMainItemInfo();
    unclickableItems();
}, 7000)


function changeMainItemInfo() {
    function comparison(idValue) {
        for (let i = 0; i < 13; i++) {
            if (!(document.querySelectorAll('div.main__item-info div')[i].classList.contains('invisible'))) {
                document.querySelectorAll('div.main__item-info div')[i].classList.add('invisible');
            }
        }
        document.getElementsByClassName(idValue)[0].classList.remove('invisible');
    }

    document.getElementById('11').onclick = function () {
        comparison('11');
    };

    document.getElementById('12').onclick = function () {
        comparison('12');
    };

    document.getElementById('22').onclick = function () {
        comparison('22');
    };

    document.getElementById('19').onclick = function () {
        comparison('19');
    };

    document.getElementById('17').onclick = function () {
        comparison('17');
    };

    document.getElementById('18').onclick = function () {
        comparison('18');
    };

    document.getElementById('16').onclick = function () {
        comparison('16');
    };

    document.getElementById('13').onclick = function () {
        comparison('13');
    };

    document.getElementById('14').onclick = function () {
        comparison('14');
    };

    document.getElementById('23').onclick = function () {
        comparison('23');
    };

    document.getElementById('21').onclick = function () {
        comparison('21');
    };

    document.getElementById('15').onclick = function () {
        comparison('15');
    };

    document.getElementById('20').onclick = function () {
        comparison('20');
    };

}

function unclickableItems() {
    function changeIcon(idValue) {
        document.getElementById(idValue).innerHTML = 'R';
    }
    function changeOpacity(value) {
        document.getElementById(value).parentElement.classList.add('unclickable');
    }
    function sendBlockBottom(value, orderValue) {
        document.getElementById(value).parentElement.setAttribute("style", "order:" + orderValue + ";");
    }
    function resetunclickable(crossId, parentId) {
        document.getElementById(parentId).classList.remove('unclickable');
        document.getElementById(parentId).setAttribute("style", "order: 0;");
        document.getElementById(crossId).innerHTML = 'X';
    }

    document.getElementById('11_cross').onclick = function () {
        if (document.getElementById('11').classList.contains('unclickable')) {
            resetunclickable('11_cross', '11');
        }
        else {
            changeIcon('11_cross');
            changeOpacity('11_cross');
            sendBlockBottom('11_cross', 14);
        }

    };
    document.getElementById('12_cross').onclick = function () {
        if (document.getElementById('12').classList.contains('unclickable')) {
            resetunclickable('12_cross', '12');
        }
        else {
            changeIcon('12_cross');
            changeOpacity('12_cross');
            sendBlockBottom('12_cross', 15);
        }
    };

    document.getElementById('22_cross').onclick = function () {
        if (document.getElementById('22').classList.contains('unclickable')) {
            resetunclickable('22_cross', '22');
        }
        else {
            changeIcon('22_cross');
            changeOpacity('22_cross');
            sendBlockBottom('22_cross', 16);
        }
    };

    document.getElementById('19_cross').onclick = function () {
        if (document.getElementById('19').classList.contains('unclickable')) {
            resetunclickable('19_cross', '19');
        }
        else {
            changeIcon('19_cross');
            changeOpacity('19_cross');
            sendBlockBottom('19_cross', 17);
        }
    };

    document.getElementById('17_cross').onclick = function () {
        if (document.getElementById('17').classList.contains('unclickable')) {
            resetunclickable('17_cross', '17');
        }
        else {
            changeIcon('17_cross');
            changeOpacity('17_cross');
            sendBlockBottom('17_cross', 18);
        }
    };

    document.getElementById('18_cross').onclick = function () {
        if (document.getElementById('18').classList.contains('unclickable')) {
            resetunclickable('18_cross', '18');
        }
        else {
            changeIcon('18_cross');
            changeOpacity('18_cross');
            sendBlockBottom('18_cross', 19);
        }
    };

    document.getElementById('16_cross').onclick = function () {
        if (document.getElementById('16').classList.contains('unclickable')) {
            resetunclickable('16_cross', '16');
        }
        else {
            changeIcon('16_cross');
            changeOpacity('16_cross');
            sendBlockBottom('16_cross', 20);
        }
    };

    document.getElementById('13_cross').onclick = function () {
        if (document.getElementById('13').classList.contains('unclickable')) {
            resetunclickable('13_cross', '13');
        }
        else {
            changeIcon('13_cross');
            changeOpacity('13_cross');
            sendBlockBottom('13_cross', 21);
        }
    };

    document.getElementById('14_cross').onclick = function () {
        if (document.getElementById('14').classList.contains('unclickable')) {
            resetunclickable('14_cross', '14');
        }
        else {
            changeIcon('14_cross');
            changeOpacity('14_cross');
            sendBlockBottom('14_cross', 22);
        }
    };

    document.getElementById('23_cross').onclick = function () {
        if (document.getElementById('23').classList.contains('unclickable')) {
            resetunclickable('23_cross', '23');
        }
        else {
            changeIcon('23_cross');
            changeOpacity('23_cross');
            sendBlockBottom('23_cross', 23);
        }
    };

    document.getElementById('21_cross').onclick = function () {
        if (document.getElementById('21').classList.contains('unclickable')) {
            resetunclickable('21_cross', '21');
        }
        else {
            changeIcon('21_cross');
            changeOpacity('21_cross');
            sendBlockBottom('21_cross', 24);
        }
    };

    document.getElementById('15_cross').onclick = function () {
        if (document.getElementById('15').classList.contains('unclickable')) {
            resetunclickable('15_cross', '15');
        }
        else {
            changeIcon('15_cross');
            changeOpacity('15_cross');
            sendBlockBottom('15_cross', 25);
        }
    };

    document.getElementById('20_cross').onclick = function () {
        if (document.getElementById('20').classList.contains('unclickable')) {
            resetunclickable('20_cross', '20');
        }
        else {
            changeIcon('20_cross');
            changeOpacity('20_cross');
            sendBlockBottom('20_cross', 26);
        }
    };
}


function handleChange() {
    var input, filter, li, a, i, txtValue;
    input = document.getElementById('filter');
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName('main__list-items')[0].getElementsByClassName('item');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}