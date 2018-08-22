// making an object for namespacing
const app = {}

// app.apiURL = 'http://superheroapi.com';
// app.apiKEY = '10205575676227056';

// making an empty array called characters
let characters = [];
let characters2 = [];
// storing the user's inputs into our empty characters array


// making our ajax request
app.getHero = (name) => { 
    return $.ajax({
        url: 'http://proxy.hackeryou.com',
        method: 'GET',
        dataType: 'json',
        data: {
            reqUrl: `http://superheroapi.com/api/10205575676227056/search/${name}`,
            proxyHeaders: {
                'Access-Control-Allow-Origin': '*'
            },
            xmlToJSON: false,
            useCache: false
        }
    })
};

app.getHero2 = (name) => {
    return $.ajax({
        url: 'http://proxy.hackeryou.com',
        method: 'GET',
        dataType: 'json',
        data: {
            reqUrl: `http://superheroapi.com/api/10205575676227056/search/${name}`,
            proxyHeaders: {
                'Access-Control-Allow-Origin': '*'
            },
            xmlToJSON: false,
            useCache: false
        }
    })
};

// mapping our 

app.event = function () {
    $('.searchHero').on('submit', function (e) {
        e.preventDefault();
        let heroInput1 = $('.hero1').val().trim();
        let heroInput2 = $('.hero2').val().trim();
        let searchValue1 = "";
        let searchValue2 = "";
        searchValue1 = characters.push($('.hero1').val());
        searchValue2 = characters2.push($('.hero2').val());

        console.log(searchValue1, searchValue2,characters, characters2);
        const characterRequests = characters.map(app.getHero);
        $.when(...characterRequests)
            .then((...responses) => {
                responses.map((item) => {
                    // console.log(item.results);
                    const heroName = `<h2 class="heroName">${item.results[0].name}</h2>`;
                    const heroImage = `<img src=${item.results[0].image.url} alt="hero image of ${$('.hero1').val()}">`
                    $('.stats1').append(heroName, heroImage);
                    
                });
            });

        const characterRequests2 = characters2.map(app.getHero2);
        $.when(...characterRequests2)
            .then((...responses) => {
                responses.map((item) => {
                    // console.log(item.results);
                    const heroName = `<h2 class="heroName">${item.results[0].name}</h2>`;
                    const heroImage = `<img src=${item.results[0].image.url} alt="hero image of ${$('.hero2').val()}">`

                    $('.stats2').append(heroName, heroImage);
                });
            });

        // console.log(app.getHero(searchValue));
        // console.log(app.getHero(searchValue2));
    });
}


app.init = function () {
    app.getHero();
    app.event();
};


$(function () {
    app.init();

});

// how do we filter through the same name when a user puts their input in?
// 