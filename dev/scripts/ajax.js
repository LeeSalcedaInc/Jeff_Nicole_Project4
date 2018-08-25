// app.apiURL = 'http://superheroapi.com';
// app.apiKEY = '10205575676227056';

// making an object for namespacing
const app = {}
// making an empty array called characters
let characters1 = [];
let characters2 = [];

// making our ajax request
app.getHero1 = (name) => {
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

// app.heroInput1 = $('.hero1').val().trim();
// app.heroInput2 = $('.hero2').val().trim();
// app.searchValue1 = characters1.push($('.hero1').val());
// app.searchValue2 = characters2.push($('.hero2').val());

async function getData() {
    let firstHeroName = await characters1.map(app.getHero1)
    let secondHeroName = await characters2.map(app.getHero2);
    $.when(...firstHeroName)
        .then((...responses) => {
            responses.map((item) => {
                console.log(item.results);
            });
        });        
    $.when(...secondHeroName)
        .then((...responses) => {
            responses.map((item) => {
                console.log(item.results);      
    });
});
}

// getData();

app.displaySpeechBubble = function () {
    app.heroObjects = item.results;
    console.log(app.heroObjects)
}

app.event = function () {
    $('.searchHero').on('submit', function (e) {
        e.preventDefault();
        app.heroInput1 = $('.hero1').val().trim();
        app.heroInput2 = $('.hero2').val().trim();
        app.searchValue1 = characters1.push($('.hero1').val());
        app.searchValue2 = characters2.push($('.hero2').val());
        getData();
        app.displaySpeechBubble();
        });
    }   
// hello


// app.event = function () {
//     $('.searchHero').on('submit', function (e) {
//         e.preventDefault();
//         searchValue1 = characters1.push($('.hero1').val());
//         searchValue2 = characters2.push($('.hero2').val());

//         // console.log(searchValue1, searchValue2,characters, characters2);
//         const characterRequests = characters1.map(app.getHero1);
//         $.when(...characterRequests)
//             .then((...responses) => {
//                 responses.map((item) => {
//                     console.log(item.results);
//                     // forEach iterates through heroObjects to find full-name
//                     let heroObjects = item.results;
//                     // let fullname = name.biography["full-name"];
//                     let heroFullName = heroObjects.forEach((name) => {
//                         console.log(name.biography["full-name"])
//                         $('.speechText').empty();
//                         $('.speechText1').text(`Which ${item.results[0].name} did you mean?`);
//                         $('.speechList1').append(
//                             `<input type="radio" name="${name.biography["full-name"]}" id="${name.biography["full-name"]}1">
//                              <label for="${name.biography["full-name"]}1">${name.biography["full-name"]}</label>`
//                         );
//                     });
//                     // this function prepends the hero's name to the first .stats1 div and applies styles
//                     const displayHeroName = `<h2 class="displayHeroName">${item.results[0].name}</h2>`;
//                     $('.stats1').css({
//                         'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.results[0].image.url}) no-repeat center`,
//                         'background-size': 'cover'
//                     });
//                     $('.stats1').prepend(displayHeroName);

//                     // myChart1 begins here
//                     let ctx = document.getElementById('myChart1').getContext('2d');
//                     Chart.defaults.global.defaultFontColor = 'white';
//                     let chart = new Chart(ctx, {
//                         type: 'horizontalBar',
//                         data: {
//                             labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
//                             datasets: [{
//                                 label: "Hero Stats",
//                                 backgroundColor: [
//                                     'red',
//                                     'lightsteelblue',
//                                     'red',
//                                     'lightsteelblue',
//                                     'red',
//                                     'lightsteelblue'],
//                                 borderColor: 'rgb(255, 99, 132)',
//                                 data: [
//                                     `${item.results[0].powerstats.combat}`,
//                                     `${item.results[0].powerstats.durability}`,
//                                     `${item.results[0].powerstats.intelligence}`,
//                                     `${item.results[0].powerstats.power}`,
//                                     `${item.results[0].powerstats.speed}`,
//                                     `${item.results[0].powerstats.strength}`
//                                 ],
//                             }]
//                         },
//                         options: {
//                             scales: {
//                                 xAxes: [{
//                                     gridLines: {
//                                         display: false,
//                                         drawBorder: false
//                                     },
//                                     ticks: {
//                                         beginAtZero: true
//                                     }
//                                 }],
//                                 yAxes: [{
//                                     gridLines: {
//                                         display: false,
//                                         drawBorder: false
//                                     }
//                                 }]
//                             }
//                         }
//                     }); // End of chart

//                 });
//             });

//         const characterRequests2 = characters2.map(app.getHero2);
//         $.when(...characterRequests2)
//             .then((...responses) => {
//                 responses.map((item) => {
//                     let heroObjects = item.results;
//                     heroObjects.forEach((name) => {
//                         console.log(name.biography["full-name"])
//                         $('.speechText').empty();
//                         $('.speechText2').text(`Which ${item.results[0].name} did you mean?`);
//                         $('.speechList2').append(
//                             `<input type="radio" name="${name.biography["full-name"]}" id="${name.biography["full-name"]}2">
//                              <label for="${name.biography["full-name"]}2">${name.biography["full-name"]}</label>`
//                         );

//                         // $('.speechText').html(`Which ${item.results[0].name} did you mean?`);
//                         // $('.speechList2').append(
//                         //     `<li><a href="#">${name.biography["full-name"]}</a></li>`
//                         // );
//                     });
//                     // this function prepends the hero's name to the .stats2 div and applies styles
//                     const displayHeroName = `<h2 class="displayHeroName">${item.results[0].name}</h2>`;
//                     $('.stats2').css({
//                         'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.results[0].image.url}) no-repeat center`,
//                         'background-size': 'cover'
//                     });
//                     $('.stats2').prepend(displayHeroName);

//                     // myChart2 begins here
//                     let ctx = document.getElementById('myChart2').getContext('2d');
//                     let chart = new Chart(ctx, {
//                         type: 'horizontalBar',
//                         data: {
//                             labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
//                             datasets: [{
//                                 label: "Hero Stats",
//                                 borderColor: 'rgb(255, 99, 132)',
//                                 data: [
//                                     `${item.results[0].powerstats.combat}`,
//                                     `${item.results[0].powerstats.durability}`,
//                                     `${item.results[0].powerstats.intelligence}`,
//                                     `${item.results[0].powerstats.power}`,
//                                     `${item.results[0].powerstats.speed}`,
//                                     `${item.results[0].powerstats.strength}`
//                                 ],
//                                 backgroundColor: [
//                                     "mediumblue",
//                                     "lightsteelblue",
//                                     "mediumblue",
//                                     "lightsteelblue",
//                                     "mediumblue",
//                                     "lightsteelblue"
//                                 ],
//                             }]
//                         },
//                         options: {
//                             scales: {
//                                 xAxes: [{
//                                     gridLines: {
//                                         display: false,
//                                         drawBorder: false
//                                     },
//                                     ticks: {
//                                         beginAtZero: true
//                                     }
//                                 }],
//                                 yAxes: [{
//                                     gridLines: {
//                                         display: false,
//                                         drawBorder: false
//                                     }
//                                 }]
//                             }
//                         }
//                     }); // End of Chart
//                 });
//             });
//     });
// }


app.init = function () {
    app.getHero1();
    app.getHero2()
    app.event();
};


$(function () {
    app.init();

});

