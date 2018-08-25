// app.apiURL = 'http://superheroapi.com';
// app.apiKEY = '10205575676227056';

// making an object for namespacing
const app = {}
// making an empty array called characters
app.characters1 = [];
app.characters2 = [];


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

app.displaySpeechBubble = function(){
    let heroObjects1 = app.firstHeroName.results; 
        heroObjects1.forEach((name) => { 
            let fullname1 = name.biography["full-name"];
            $('.speechText').empty();
            $('.speechText1').text(`Which ${app.heroInput1} did you mean?`);
            $('.speechList1').append(
                `<input type="radio" name="firstHeroName" id="${fullname1}">
                <label for="${fullname1}">${fullname1}</label>`
            );
        });
    let heroObjects2 = app.secondHeroName.results;
        heroObjects2.forEach((name) => {
            let fullname2 = name.biography["full-name"];
            $('.speechText').empty();
            $('.speechText2').text(`Which ${app.heroInput2} did you mean?`);
            $('.speechList2').append(
                `<input type="radio" name="secondHeroName" id="${fullname2}">
                <label for="${fullname2}">${fullname2}</label>`
            );
        });
    $('.secondaryForm').append(
        `<input class="displayButton" type="submit" value="Show me ${app.heroInput1} VS ${app.heroInput2}">`
    );
}
app.submitEvent = function () {
    $('.secondaryForm').on('submit', function (e) {
        e.preventDefault();
// this is where the input conditionals should be for diplaying the images below based on selection
    });
}
// myChart1 begins here
app.myChart = function(hero1, hero2){
    let ctx1 = document.getElementById('myChart1').getContext('2d');
    Chart.defaults.global.defaultFontColor = 'white';
    let chart1 = new Chart(ctx1, {
        type: 'horizontalBar',
        data: {
            labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
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
                    `${hero1.results[0].powerstats.combat}`,
                    `${hero1.results[0].powerstats.durability}`,
                    `${hero1.results[0].powerstats.intelligence}`,
                    `${hero1.results[0].powerstats.power}`,
                    `${hero1.results[0].powerstats.speed}`,
                    `${hero1.results[0].powerstats.strength}`
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
    }); // End of chart1
    // chart2 begins
    // myChart2 begins here
    let ctx2 = document.getElementById('myChart2').getContext('2d');
    let chart2 = new Chart(ctx2, {
        type: 'horizontalBar',
        data: {
            labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
            datasets: [{
                label: "Hero Stats",
                borderColor: 'rgb(255, 99, 132)',
                data: [
                    `${hero2.results[0].powerstats.combat}`,
                    `${hero2.results[0].powerstats.durability}`,
                    `${hero2.results[0].powerstats.intelligence}`,
                    `${hero2.results[0].powerstats.power}`,
                    `${hero2.results[0].powerstats.speed}`,
                    `${hero2.results[0].powerstats.strength}`
                ],
                backgroundColor: [
                    "mediumblue",
                    "lightsteelblue",
                    "mediumblue",
                    "lightsteelblue",
                    "mediumblue",
                    "lightsteelblue"
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
    }); // End of Chart

}

// Comment
    app.displayHero = function (hero1, hero2) { 
        const displayHeroName1 = `<h2 class="displayHeroName">${app.firstHeroName.results[0].name}</h2>`;
        const displayHeroName2 = `<h2 class="displayHeroName">${app.secondHeroName.results[0].name}</h2>`
        $('.stats1').css({
            'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero1.results[0].image.url}) no-repeat center`,
            'background-size': 'cover'
        }).prepend(displayHeroName1);

        $('.stats2').css({
            'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero2.results[0].image.url}) no-repeat center`,
            'background-size': 'cover'
        }).prepend(displayHeroName2);
    }


    app.getData = async function Data() {
        app.firstHeroName = await app.getHero1(app.characters1); // Samething as before without the when and then and no errors
        app.secondHeroName = await app.getHero2(app.characters2);
        app.displayHero(app.firstHeroName, app.secondHeroName);
        app.myChart(app.firstHeroName, app.secondHeroName);
        app.displaySpeechBubble();
        app.submitEvent();
        // app.displayHeroes();
        
    }
// app.displaySpeechBubble = function () {
//     app.getData();
//     console.log(app.firstHeroName)
// }

app.event = function () {
    $('.searchHero').on('submit', function (e) {
        e.preventDefault();
        app.heroInput1 = $('.hero1').val().trim();
        app.heroInput2 = $('.hero2').val().trim();
        app.searchValue1 = app.characters1.push($('.hero1').val());
        app.searchValue2 = app.characters2.push($('.hero2').val());
        app.getData();
    
        
        // app.displayHeroes();
    });
}  

    
//


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
//                     ach((name) => {
//                         console.log(name.biography["full-name"])
//                         $('.speechText').empty();let heroObjects = item.results;
//                     // let fullname = name.biography["full-name"];
//                     let heroFullName = heroObjects.forE
//                         $('.speechText1').text(`Which ${item.results[0].name} did you mean?`);
//                         $('.speechList1').append(
//                             `<input type="radio" name="${name.biography["full-name"]}" id="${name.biography["full-name"]}1">
//                              <label for="${name.biography["full-name"]}1">${name.biography["full-name"]}</label>`
//                         );
//                     });
//                     // this function prepends the hero's name to the first .stats1 div and applies styles
                    // const displayHeroName = `<h2 class="displayHeroName">${item.results[0].name}</h2>`;
                    // $('.stats1').css({
                    //     'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.results[0].image.url}) no-repeat center`,
                    //     'background-size': 'cover'
                    // });
//                     $('.stats1').prepend(displayHeroName);

                    // // myChart1 begins here
                    // let ctx = document.getElementById('myChart1').getContext('2d');
                    // Chart.defaults.global.defaultFontColor = 'white';
                    // let chart = new Chart(ctx, {
                    //     type: 'horizontalBar',
                    //     data: {
                    //         labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
                    //         datasets: [{
                    //             label: "Hero Stats",
                    //             backgroundColor: [
                    //                 'red',
                    //                 'lightsteelblue',
                    //                 'red',
                    //                 'lightsteelblue',
                    //                 'red',
                    //                 'lightsteelblue'],
                    //             borderColor: 'rgb(255, 99, 132)',
                    //             data: [
                    //                 `${item.results[0].powerstats.combat}`,
                    //                 `${item.results[0].powerstats.durability}`,
                    //                 `${item.results[0].powerstats.intelligence}`,
                    //                 `${item.results[0].powerstats.power}`,
                    //                 `${item.results[0].powerstats.speed}`,
                    //                 `${item.results[0].powerstats.strength}`
                    //             ],
                    //         }]
                    //     },
                    //     options: {
                    //         scales: {
                    //             xAxes: [{
                    //                 gridLines: {
                    //                     display: false,
                    //                     drawBorder: false
                    //                 },
                    //                 ticks: {
                    //                     beginAtZero: true
                    //                 }
                    //             }],
                    //             yAxes: [{
                    //                 gridLines: {
                    //                     display: false,
                    //                     drawBorder: false
                    //                 }
                    //             }]
                    //         }
                    //     }
                    // }); // End of chart

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

                    // // myChart2 begins here
                    // let ctx = document.getElementById('myChart2').getContext('2d');
                    // let chart = new Chart(ctx, {
                    //     type: 'horizontalBar',
                    //     data: {
                    //         labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
                    //         datasets: [{
                    //             label: "Hero Stats",
                    //             borderColor: 'rgb(255, 99, 132)',
                    //             data: [
                    //                 `${item.results[0].powerstats.combat}`,
                    //                 `${item.results[0].powerstats.durability}`,
                    //                 `${item.results[0].powerstats.intelligence}`,
                    //                 `${item.results[0].powerstats.power}`,
                    //                 `${item.results[0].powerstats.speed}`,
                    //                 `${item.results[0].powerstats.strength}`
                    //             ],
                    //             backgroundColor: [
                    //                 "mediumblue",
                    //                 "lightsteelblue",
                    //                 "mediumblue",
                    //                 "lightsteelblue",
                    //                 "mediumblue",
                    //                 "lightsteelblue"
                    //             ],
                    //         }]
                    //     },
                    //     options: {
                    //         scales: {
                    //             xAxes: [{
                    //                 gridLines: {
                    //                     display: false,
                    //                     drawBorder: false
                    //                 },
                    //                 ticks: {
                    //                     beginAtZero: true
                    //                 }
                    //             }],
                    //             yAxes: [{
                    //                 gridLines: {
                    //                     display: false,
                    //                     drawBorder: false
                    //                 }
                    //             }]
                    //         }
                    //     }
                    // }); // End of Chart
//                 });
//             });
//     });
// }


app.init = function () {
    app.getHero1();
    app.getHero2();
    app.event();
   
};


$(function () {
    app.init();

});

