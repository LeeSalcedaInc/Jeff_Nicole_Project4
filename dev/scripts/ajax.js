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
                    console.log(item.results[0]);
                    const heroName = `<h2 class="heroName">${item.results[0].name}</h2>`;
                    const heroImage = `<img src=${item.results[0].image.url} alt="hero image of ${$('.hero1').val()}">`
                    $('.stats1').append(heroName, heroImage);
                    let ctx = document.getElementById('myChart1').getContext('2d');
                    let chart = new Chart(ctx, {
                        type: 'horizontalBar',
                        data: {
                            labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
                            datasets: [{
                                label: "Hero Stats",
                                backgroundColor: 'red',
                                borderColor: 'rgb(255, 99, 132)',
                                data: [`${item.results[0].powerstats.combat}`, `${item.results[0].powerstats.durability}`, `${item.results[0].powerstats.intelligence}`, `${item.results[0].powerstats.power}`, `${item.results[0].powerstats.speed}`, `${item.results[0].powerstats.strength}`],
                            }]
                        },
                        options: {
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    }); // End of chart
                    
                });
            });

        const characterRequests2 = characters2.map(app.getHero2);
        $.when(...characterRequests2)
            .then((...responses) => {
                responses.map((item) => {
                    console.log(item.results[0]);
                    const heroName = `<h2 class="heroName">${item.results[0].name}</h2>`;
                    const heroImage = `<figure><img src=${item.results[0].image.url} alt="hero image of ${$('.hero2').val()}"></figure>`
                    $('.stats2').append(heroName, heroImage);
                    let ctx = document.getElementById('myChart2').getContext('2d');
                    let chart = new Chart(ctx, {
                        type: 'horizontalBar',
                        data: {
                            labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
                            datasets: [{
                                label: "Hero Stats",
                                borderColor: 'rgb(255, 99, 132)',
                                data: [`${item.results[0].powerstats.combat}`, `${item.results[0].powerstats.durability}`, `${item.results[0].powerstats.intelligence}`, `${item.results[0].powerstats.power}`, `${item.results[0].powerstats.speed}`, `${item.results[0].powerstats.strength}`],
                                backgroundColor: [
                                    "#f38b4a",
                                    "#56d798",
                                    "blue",
                                    "orange",
                                    "yellow",
                                    "red"
                                ],
                            }]
                        },
                        options: {
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    }); // End of Chart
                });
            });

        // console.log(app.getHero(searchValue));
        // console.log(app.getHero(searchValue2));
    });
}

// hello
app.init = function () {
    app.getHero();
    app.event();
};


$(function () {
    app.init();

});

// how do we filter through the same name when a user puts their input in?
// 