// app.apiURL = 'http://superheroapi.com';
// app.apiKEY = '10205575676227056';

// making an object for namespacing
const app = {}
// making an empty array called characters
app.characters1 = [];
app.characters2 = [];

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

// We have the list of full names appended on to the secondaryForm
// User selects the intended full name of their hero.
// On submit, we want to display their stats and image of the hero they selected


 app.gettingHeroesObject = function (character1, character2) {
        $.when(character1, character2)
            .then((...responses) => {
                responses.map((item) => {
                    console.log(responses);
                    app.heroObjects1 = item[0].results;
                    app.heroFullName = app.heroObjects1.forEach((name) => {
                        console.log(name.biography["full-name"])  
                    });
                    $('.speechText').empty();
                }); 
            });
        }
                if (app.heroObjects1.length > 1) {
                    $('.speechText1').text(`Which ${heroInput1} did you mean?`);
                    $('.speechList1').append(
                        `<input type="radio" name="heroFullName1" id="${name.biography["full-name"]}1">
                     <label for="${name.biography["full-name"]}1">${name.biography["full-name"]}</label>`)
                    const displayHeroName = `<h2 class="displayHeroName">${item.results[0].name}</h2>`;
                    $('.stats1').css({
                        'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.results[0].image.url}) no-repeat center`,
                        'background-size': 'cover'
                    });
                    $('.stats1').prepend(displayHeroName);
                };
            
app.heroesChart = function() {
    let ctx = document.getElementById('myChart1').getContext('2d');
    Chart.defaults.global.defaultFontColor = 'white';
    let chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: 
        {labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"], 
        datasets: [{
                label: "Hero Stats",
                backgroundColor: [
                    'red',
                    'lightsteelblue',
                    'red',
                    'lightsteelblue',
                    'red',
                    'lightsteelblue'],
                borderColor: 'rgb(255, 99, 132)',
                data: [
                    `${item.results[0].powerstats.combat}`,
                    `${item.results[0].powerstats.durability}`,
                    `${item.results[0].powerstats.intelligence}`,
                    `${item.results[0].powerstats.power}`,
                    `${item.results[0].powerstats.speed}`,
                    `${item.results[0].powerstats.strength}`
                ],
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }]
            }
        }
    }); // End of chart
}
app.event = function () {
    $('.searchHero').on('submit', function (e) {
        e.preventDefault();
        let heroInput1 = $('.hero1').val().trim();
        let heroInput2 = $('.hero2').val().trim();
        console.log(heroInput1, "character1"); 
        console.log(heroInput2, "character2");
        app.characterRequests1 = app.getHero(heroInput1);
        app.characterRequests2 = app.getHero(heroInput2);
        app.gettingHeroesObject(app.characterRequests1, app.characterRequests2),
        app.heroesChart();

    
                   

            // .then((...responses) => {
            //     responses.map((item) => {
            //         console.log(item.results);
            //         app.heroObjects2 = item.results;
            //         app.heroFullName = app.heroObjects2.forEach((name) => {
            //             console.log(name.biography["full-name"])
            //             $('.speechText').empty();
            //             if (app.heroObjects2.length > 1) {
            //             $('.speechText2').text(`Which ${heroInput2} did you mean?`);
            //             $('.speechList2').append(
            //                 `<input type="radio" name="heroFullName2" id="${name.biography["full-name"]}2">
            //                  <label for="${name.biography["full-name"]}2">${name.biography["full-name"]}</label>`
            //             );  
            //         }  
            //         });
            //         $('.secondaryForm').append('<input type ="submit" value="Show me my results!" class="formSubmit">')   
            //         // this function prepends the hero's name to the .stats2 div and applies styles
            //         const displayHeroName = `<h2 class="displayHeroName">${item.results[0].name}</h2>`;
            //         $('.stats2').css({ 
            //             'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.results[0].image.url}) no-repeat center`, 
            //             'background-size': 'cover' 
            //         });
            //         $('.stats2').prepend(displayHeroName);

            //         // myChart2 begins here
            //         let ctx = document.getElementById('myChart2').getContext('2d');
            //         let chart = new Chart(ctx, {
            //             type: 'horizontalBar',
            //             data: {
            //                 labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
            //                 datasets: [{
            //                     label: "Hero Stats",
            //                     borderColor: 'rgb(255, 99, 132)',
            //                     data: [
            //                         `${item.results[0].powerstats.combat}`, 
            //                         `${item.results[0].powerstats.durability}`, 
            //                         `${item.results[0].powerstats.intelligence}`, 
            //                         `${item.results[0].powerstats.power}`, 
            //                         `${item.results[0].powerstats.speed}`, 
            //                         `${item.results[0].powerstats.strength}`
            //                     ],
            //                     backgroundColor: [
            //                         "mediumblue",
            //                         "lightsteelblue",
            //                         "mediumblue",
            //                         "lightsteelblue",
            //                         "mediumblue",
            //                         "lightsteelblue"
            //                     ],
            //                 }]
            //             },
            //             options: {
            //                 scales: {
            //                     xAxes: [{
            //                         gridLines: {
            //                             display: false,
            //                             drawBorder: false
            //                         },
            //                         ticks: {
            //                             beginAtZero: true
            //                         }
            //                     }],
            //                     yAxes: [{
            //                         gridLines: {
            //                             display: false,
            //                             drawBorder: false
            //                         }
            //                     }]
            //                 }
            //             }
            //         }); // End of Chart
            //     });
            // });
    });
}

app.secondaryFormSubmit = function () {
    $('.secondaryForm').on('submit', function (e) {
        e.preventDefault();
        console.log(app.heroObjects1)
        
    });
}



app.init = function () {
    app.event();
    app.secondaryFormSubmit();
};


$(function () {
    app.init();

});

