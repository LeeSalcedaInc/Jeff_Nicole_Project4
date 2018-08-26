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


app.displaySpeechBubble = function(hero1, hero2){
    if (hero1.results.length > 1 || hero2.results.length > 1) {
    let heroObjects1 = app.firstHeroName.results; 
        heroObjects1.forEach((name) => { 
            let fullname1 = name.biography["full-name"];
            $('.speechText').empty();
            $('.speechText1').text(`Which ${app.heroInput1} did you mean?`);
            $('.speechList1').append(
                `<input class="firstHeroName" type="radio" name="firstHeroName" id="${fullname1}" value="${fullname1}" data-name="${fullname1}" required>
                <label for="${fullname1}">${fullname1}</label>`
            );
        });
    let heroObjects2 = app.secondHeroName.results;
        heroObjects2.forEach((name) => {
            let fullname2 = name.biography["full-name"];
            $('.speechText').empty();
            $('.speechText2').text(`Which ${app.heroInput2} did you mean?`);
            $('.speechList2').append(
                `<input class="secondHeroName" type="radio" name="secondHeroName" id="${fullname2}" value="${fullname2}" data-name="${fullname2}" required>
                <label for="${fullname2}">${fullname2}</label>`
            );
        });
    $('.secondaryForm').append(
        `<input class="displayButton" type="submit" value="Show me ${app.heroInput1} VS ${app.heroInput2}">`
    );
}
}



app.submitEvent = function (hero1, hero2) {
    $('.secondaryForm').on('submit', function (e) {
        e.preventDefault();
        app.getByValue = function (hero1, hero2) {
            for (var i = 0; i < hero1.results.length; i++) {
                app.theobject1 = hero1.results
                if (app.theobject1[i].biography["full-name"] == ($("input[name=firstHeroName]:checked").data('name'))) {
                    console.log(app.theobject1[i])
                    const displayHeroName1 = `<h2 class="displayHeroName">${app.theobject1[i].name}</h2>`;
                    $('.stats1').css({
                        'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${app.theobject1[i].image.url}) no-repeat center`,
                        'background-size': 'cover'
                    }).prepend(displayHeroName1);
                    this.myChart1(hero1);
                }
            }
            for (var i = 0; i < hero2.results.length; i++) {
                app.theobject2 = hero2.results
                if (app.theobject2[i].biography["full-name"] == ($("input[name=secondHeroName]:checked").data('name'))) {
                    console.log(app.theobject2[i])
                    const displayHeroName2 = `<h2 class="displayHeroName">${app.theobject2[i].name}</h2>`;
                    $('.stats2').css({
                        'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${app.theobject2[i].image.url}) no-repeat center`,
                        'background-size': 'cover'
                    }).prepend(displayHeroName2);
                    this.myChart2(hero2);
                }
            }
            // for (var i = 0; i < hero2.results.length; i++) {
            //     // if (hero1.results[i].biography["full-name"] == $('.firstHeroName input[radio][name=firstHeroName]:checked')) {
            //     // return hero1.results[i]
            //     app.theobject2 = hero2.results[i]
            //     if (app.theobject2.biography["full-name"] == $('.secondHeroName input[radio][name=secondHeroName]:checked')) {
            //         return app.theobject;
            //     }
            // }
        }
        console.log(app.getByValue(app.firstHeroName, app.secondHeroName));
    
        //     // if the input selected contains the same fullname, display the object's stats
        // let heroAnswer1 = $('.firstHeroName input[radio][name=firstHeroName]:checked').val();
        // let heroAnswer2 = $('.secondHeroName input[radio][name=secondHeroName]:checked').val();
        // console.log(heroAnswer1, heroAnswer2);
        
    
// this is where the input conditionals should be for diplaying the images below based on selection
    });
}
// myChart1 begins here
app.myChart1 = function(hero1){
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
            legend: {
                display: false
            },
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
}
    // chart2 begins
    // myChart2 begins here
app.myChart2 = function (hero2) {    
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
            legend: {
                display: false
            },
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

app.displayWinner = function(hero1, hero2){
    // if the input selected contains the same fullname, display the object's stats
    // let heroAnswer1 = $('.firstHeroName input[type = radio]:checked');
    // console.log(heroAnswer1);
}
app.displayHero = function (hero1, hero2) { 
    if (hero1.results.length < 2 && hero2.results.length < 2) {
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
}


    app.getData = async function Data() {
        app.firstHeroName = await app.getHero1(app.characters1); 
        console.log(app.firstHeroName)
        app.secondHeroName = await app.getHero2(app.characters2);
        app.displayHero(app.firstHeroName, app.secondHeroName);
        if (app.firstHeroName.results.length < 2 && app.secondHeroName.results.length < 2) {
            this.myChart1(app.firstHeroName);
            this.myChart2(app.secondHeroName);
        }
        app.displayWinner(app.firstHeroName, app.secondHeroName, app.myChart);
        app.displaySpeechBubble(app.firstHeroName, app.secondHeroName);
        app.submitEvent();
    
        
    }


app.event = function () {
    $('.searchHero').on('submit', function (e) {
        e.preventDefault();
        app.heroInput1 = $('.hero1').val().trim();
        app.heroInput2 = $('.hero2').val().trim();
        app.searchValue1 = app.characters1.push($('.hero1').val());
        app.searchValue2 = app.characters2.push($('.hero2').val());
        app.getData();
    });
}  

app.init = function () {
    app.getHero1();
    app.getHero2();
    app.event();
   
};


$(function () {
    app.init();

});

