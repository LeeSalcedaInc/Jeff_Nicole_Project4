// app.apiURL = 'http://superheroapi.com';
// app.apiKEY = '10205575676227056';

// making an object for namespacing
const app = {}
// making an empty array called characters
app.characters1 = [];
app.characters2 = [];

app.emptyarray1 = [];
app.emptyarray2 = [];

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

app.displayMessage = function (hero1, hero2) {
    console.log(app.uniqueHeroObjects1)
}


app.displaySpeechBubble = function(hero1, hero2){
    if (hero1.results.length > 1 || hero2.results.length > 1) {
    let heroObjects1 = app.firstHeroName.results;
    let dup1array = [];
    app.uniqueHeroObjects1 = heroObjects1.filter(function(array) {
        if (dup1array.indexOf(array.biography["full-name"]) == -1) {
            dup1array.push(array.biography["full-name"]);
            return true;
        }
        return false;

    });
    console.log(app.uniqueHeroObjects1);

    $('.speechList1, .speechText').empty(); 
    $('.speechList1').append(`<p class="speechText1">Which ${app.heroInput1} did you mean?</p>`); // Emptying it outside the ForEach function so it doesn't repeat
    app.uniqueHeroObjects1.forEach((name) => {
            let fullname1 = name.biography["full-name"];
            $('.speechList1').append(
                `<input class="firstHeroName" type="radio" name="firstHeroName" id="${fullname1}" value="${fullname1}" data-name="${fullname1}" required>
                <label for="${fullname1}">${fullname1}</label>`
            );
        });
    let heroObjects2 = app.secondHeroName.results;
    let dup2array = [];
    app.uniqueHeroObjects2 = heroObjects2.filter(function (array) {
        if (dup2array.indexOf(array.biography["full-name"]) == -1) {
            dup2array.push(array.biography["full-name"]);
            return true;
        }
        return false;

    });
    console.log(app.uniqueHeroObjects2);
        $('.speechList2, speechText').empty();
        $('.speechList2').append(`<p class="speechText2">Which ${app.heroInput2} did you mean?</p>`); // Emptying it outside the ForEach function so it doesn't repeat
        $('.secondbutton').empty();
        app.uniqueHeroObjects2.forEach((name) => {
            let fullname2 = name.biography["full-name"];
            $('.speechList2').append(
                `<input class="secondHeroName" type="radio" name="secondHeroName" id="${fullname2}" value="${fullname2}" data-name="${fullname2}" required>
                <label for="${fullname2}">${fullname2}</label>`
            )
        });
    $('.secondbutton').append(
        `<input class="displayButton" type="submit" value="Show me ${app.heroInput1} VS ${app.heroInput2}">`
    );
}
}


// SUBMIT EVENT OF SECONDARY FORM TO SCROLL DOWN TO RESULTS
app.submitEvent = function (hero1, hero2) {
    $('.secondaryForm').on('submit', function (e) {
        $('.stats1').empty();
        $('.stats2').empty();
        app.emptyarray1 = [];
        app.emptyarray2 = [];
        e.preventDefault();
        // results scroll
        $('html, body').animate({
            scrollTop: $('#finalResults').offset().top
        }, 1000);
        const canvas1 = $('<canvas>').attr('id', 'myChart1');
        const canvas2 = $('<canvas>').attr('id', 'myChart2')
        app.getByValue = function () {
            for (var i = 0; i < app.uniqueHeroObjects1.length; i++) {
                if (app.uniqueHeroObjects1[i].biography["full-name"] == ($("input[name=firstHeroName]:checked").data('name'))) {
                    console.log(app.uniqueHeroObjects1[i])
                    const displayHeroName1 = `<h2 class="displayHeroName">${app.uniqueHeroObjects1[i].name}</h2>`;
                    $('.stats1').css({
                        'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${app.uniqueHeroObjects1[i].image.url}) no-repeat center`,
                        'background-size': 'cover'
                    }).prepend(displayHeroName1).append(canvas1);
                    let ctx1 = document.getElementById('myChart1').getContext('2d');
                    Chart.defaults.global.defaultFontColor = 'white';
                    let chart1 = new Chart(ctx1, {
                        type: 'horizontalBar',
                        data: {
                            labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
                            datasets: [{
                                label: "Hero Stats",
                                backgroundColor: [
                                    'rgba(205,92,92,0.8)',
                                    'rgba(176,196,222,0.8)',
                                    'rgba(205,92,92,0.8)',
                                    'rgba(176,196,222,0.8)',
                                    'rgba(205,92,92,0.8)',
                                    'rgba(176,196,222,0.8)'],
                                borderColor: 'rgb(255, 99, 132)',
                                data: [
                                    `${app.uniqueHeroObjects1[i].powerstats.combat}`,
                                    `${app.uniqueHeroObjects1[i].powerstats.durability}`,
                                    `${app.uniqueHeroObjects1[i].powerstats.intelligence}`,
                                    `${app.uniqueHeroObjects1[i].powerstats.power}`,
                                    `${app.uniqueHeroObjects1[i].powerstats.speed}`,
                                    `${app.uniqueHeroObjects1[i].powerstats.strength}`
                                ],
                            }]
                        },
                        options: { legend: { display: false},
                            scales: { xAxes: [{ gridLines: { display: false, drawBorder: false},
                                    ticks: { beginAtZero: true} }],
                                    yAxes: [{ gridLines: { display: false, drawBorder: false
                                    }
                                }]
                            }
                        }
                    }); // End of chart1
                app.emptyarray1.push(app.uniqueHeroObjects1[i].powerstats.combat);
                app.emptyarray1.push(app.uniqueHeroObjects1[i].powerstats.durability);
                app.emptyarray1.push(app.uniqueHeroObjects1[i].powerstats.intelligence);
                app.emptyarray1.push(app.uniqueHeroObjects1[i].powerstats.power);
                app.emptyarray1.push(app.uniqueHeroObjects1[i].powerstats.speed);
                app.emptyarray1.push(app.uniqueHeroObjects1[i].powerstats.strength);
                let num1 = app.emptyarray1.map(function (x) {
                    return parseInt(x, 10);
                });
                console.log(num1)
                const reducer1 = (add, total) => add + total;
                app.total1 = num1.reduce(reducer1);
                console.log(app.total1)
                }
            }
            for (var i = 0; i < app.uniqueHeroObjects2.length; i++) {
                if (app.uniqueHeroObjects2[i].biography["full-name"] == ($("input[name=secondHeroName]:checked").data('name'))) {
                    console.log(app.uniqueHeroObjects2[i])
                    const displayHeroName2 = `<h2 class="displayHeroName">${app.uniqueHeroObjects2[i].name}</h2>`;
                    $('.stats2').css({
                        'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${app.uniqueHeroObjects2[i].image.url}) no-repeat center`,
                        'background-size': 'cover'
                    }).prepend(displayHeroName2).append(canvas2);
                    let ctx1 = document.getElementById('myChart2').getContext('2d');
                    Chart.defaults.global.defaultFontColor = 'white';
                    let chart2 = new Chart(ctx1, {
                        type: 'horizontalBar',
                        data: {
                            labels: ["Combat", "Durability", "Intelligence", "Power", "Speed", "Strength"],
                            datasets: [{
                                label: "Hero Stats",
                                backgroundColor: [
                                    "rgba(0,0,205,0.5)",
                                    'rgba(176,196,222,0.8)',
                                    "rgba(0,0,205,0.5)",
                                    'rgba(176,196,222,0.8)',
                                    "rgba(0,0,205,0.5)",
                                    'rgba(176,196,222,0.8)'],
                                borderColor: 'rgb(255, 99, 132)',
                                data: [
                                    `${app.uniqueHeroObjects2[i].powerstats.combat}`,
                                    `${app.uniqueHeroObjects2[i].powerstats.durability}`,
                                    `${app.uniqueHeroObjects2[i].powerstats.intelligence}`,
                                    `${app.uniqueHeroObjects2[i].powerstats.power}`,
                                    `${app.uniqueHeroObjects2[i].powerstats.speed}`,
                                    `${app.uniqueHeroObjects2[i].powerstats.strength}`
                                ],
                            }]
                        },
                        options: { legend: {
                                display: false},
                            scales: {xAxes: [{ gridLines: {display: false, drawBorder: false},
                                    ticks: { beginAtZero: true }}],
                                    yAxes: [{gridLines: {display: false, drawBorder: false
                                    }
                                }]
                            }
                        }
                    }); // End of chart1
                    app.emptyarray2.push(app.uniqueHeroObjects2[i].powerstats.combat)
                    app.emptyarray2.push(app.uniqueHeroObjects2[i].powerstats.durability)
                    app.emptyarray2.push(app.uniqueHeroObjects2[i].powerstats.intelligence)
                    app.emptyarray2.push(app.uniqueHeroObjects2[i].powerstats.power)
                    app.emptyarray2.push(app.uniqueHeroObjects2[i].powerstats.speed)
                    app.emptyarray2.push(app.uniqueHeroObjects2[i].powerstats.strength)
                    let num2 = app.emptyarray2.map(function (x) {
                        return parseInt(x, 10);
                    });
                    console.log(num2)
                    const reducer2 = (add, total) => add + total;
                    app.total2 = num2.reduce(reducer2);
                    console.log(app.total2)
                }
// message results display
                if (app.total1 - app.total2 > 200) {
                    $('h1.resultsText').text(`HOLY MOLY, This is an annihilation! Even Jeff can beat up ${app.heroInput2}.`);
                }
                else if (app.total1 - app.total2 > 100) {
                    $('h1.resultsText').text(`${app.heroInput1} is gonna absolutely destroy ${app.heroInput2}.`);
                }
                else if (app.total1 - app.total2 > 50) {
                    $('h1.resultsText').text(`${app.heroInput1} is gonna kick ${app.heroInput2}'s ass`);
                }
                else if (app.total1 - app.total2 > 0) {
                    $('h1.resultsText').text(`${app.heroInput1} is gonna beat up ${app.heroInput2} period.`);
                }
                else if (app.total2 - app.total1 > 200) {
                    $('h1.resultsText').text(`HOLY MOLY, This is an annihilation! Even Jeff can beat up ${app.heroInput1}.`);
                }
                else if (app.total2 - app.total1 > 100) {
                    $('h1.resultsText').text(`${app.heroInput2} is gonna absolutely destroy ${app.heroInput1}.`);
                }
                else if (app.total2 - app.total1 > 50) {
                    $('h1.resultsText').text(`${app.heroInput2} is gonna kick ${app.heroInput1}'s ass`);
                }
                else if (app.total2 - app.total1 > 0) {
                    $('h1.resultsText').text(`${app.heroInput2} is gonna beat up ${app.heroInput1} period.`);
                }
            }
        }
        console.log(app.getByValue(app.firstHeroName, app.secondHeroName));
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
                    'rgba(205,92,92,0.8)',
                    'rgba(176,196,222,0.8)',
                    'rgba(205,92,92,0.8)',
                    'rgba(176,196,222,0.8)',
                    'rgba(205,92,92,0.8)',
                    'rgba(176,196,222,0.8)'],
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
        options: {legend: { display: false},
            scales: {xAxes: [{ gridLines: { display: false, drawBorder: false },
                    ticks: { beginAtZero: true}}],
                    yAxes: [{ gridLines: { display: false, drawBorder: false
                    }
                }]
            }
        }
    }); // End of chart1
    app.emptyarray1.push(hero1.results[0].powerstats.combat);
    app.emptyarray1.push(hero1.results[0].powerstats.durability);
    app.emptyarray1.push(hero1.results[0].powerstats.intelligence);
    app.emptyarray1.push(hero1.results[0].powerstats.power);
    app.emptyarray1.push(hero1.results[0].powerstats.speed);
    app.emptyarray1.push(hero1.results[0].powerstats.strength);
    let num1 = app.emptyarray1.map(function (x) {
        return parseInt(x, 10);
    });
    const reducer1 = (add, total) => add + total;
    app.total1 = num1.reduce(reducer1);
    console.log(app.total1)
}
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
                    "rgba(0,0,205,0.5)",
                    "rgba(176,196,222,0.8)",
                    "rgba(0,0,205,0.5)",
                    "rgba(176,196,222,0.8)",
                    "rgba(0,0,205,0.5)",
                    "rgba(176,196,222,0.8)"
                ],
            }]
        },
        options: { legend: { display: false},
            scales: { xAxes: [{ gridLines: { display: false, drawBorder: false},
                    ticks: {beginAtZero: true}}],
                    yAxes: [{gridLines: {display: false, drawBorder: false
                    }
                }]
            }
        }
    }); // End of Chart
    // ADDING HERO2 STATS
    app.emptyarray2.push(hero2.results[0].powerstats.combat);
    app.emptyarray2.push(hero2.results[0].powerstats.durability);
    app.emptyarray2.push(hero2.results[0].powerstats.intelligence);
    app.emptyarray2.push(hero2.results[0].powerstats.power);
    app.emptyarray2.push(hero2.results[0].powerstats.speed);
    app.emptyarray2.push(hero2.results[0].powerstats.strength);
    let num2 = app.emptyarray2.map(function (x) {
        return parseInt(x, 10);
    });
    const reducer2 = (add, total) => add + total;
    app.total2 = num2.reduce(reducer2);
    console.log(app.total2)
// IF ELSE CONDITIONS FOR DISPLAYING HERO RESULTS MESSAGE
    if (app.total1 - app.total2 > 200) {
        $('.resultsText').text(`HOLY MOLY, This is an annihilation! Even Jeff can beat up ${app.heroInput2}.`)
    }
    else if (app.total1 - app.total2 > 100) {
        $('.resultsText').text(`${app.heroInput1} is gonna absolutely destroy ${app.heroInput2}.`)
    }
    else if (app.total1 - app.total2 > 50) {
        $('.resultsText').text(`${app.heroInput1} is gonna kick ${app.heroInput2}'s ass`)
    }
    else if (app.total1 - app.total2 > 0 ) {
        $('.resultsText').text(`${app.heroInput1} is gonna beat up ${app.heroInput2}.`)
    }
    else if (app.total2 - app.total1 > 200) {
        $('.resultsText').text(`HOLY MOLY, This is an annihilation! Even Jeff can beat up ${app.heroInput1}.`)
    }
    else if (app.total2 - app.total1 > 100) {
        $('.resultsText').text(`${app.heroInput2} is gonna absolutely destroy ${app.heroInput1}.`)
    }
    else if (app.total2 - app.total1 > 50) {
        $('.resultsText').text(`${app.heroInput2} is gonna kick ${app.heroInput1}'s ass`)
    }
    else if (app.total2 - app.total1 > 0) {
        $('.resultsText').text(`${app.heroInput2} is gonna beat up ${app.heroInput1}.`)
    }
}
// FUNCTION TO DISPLAY HERO IMAGES AND TITLE
app.displayHero = function (hero1, hero2) { 
    if (hero1.results.length < 2 && hero2.results.length < 2) {
    $('.stats1, .stats2').empty();
    app.emptyarray1 = [];
    app.emptyarray2 = [];
    const displayHeroName1 = `<h2 class="displayHeroName">${app.firstHeroName.results[0].name}</h2>`;
    const displayHeroName2 = `<h2 class="displayHeroName">${app.secondHeroName.results[0].name}</h2>`
    const canvas1 = $('<canvas>').attr('id', 'myChart1')
    const canvas2 = $('<canvas>').attr('id', 'myChart2')
    $('.stats1').css({
        'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero1.results[0].image.url}) no-repeat center`,
        'background-size': 'cover'
    }).prepend(displayHeroName1).append(canvas1);

    $('.stats2').css({
        'background': `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero2.results[0].image.url}) no-repeat center`,
        'background-size': 'cover'
    }).prepend(displayHeroName2).append(canvas2);
}
}
// FUNCTION TO ADD TOTAL OF STATS OF HERO1
app.totalstats = function (hero1) {
    app.emptyarray.push(app.uniqueHeroObjects1[i].powerstats.combat)
    app.emptyarray.push(app.uniqueHeroObjects1[i].powerstats.durability)
    app.emptyarray.push(app.uniqueHeroObjects1[i].powerstats.intelligence)
    app.emptyarray.push(app.uniqueHeroObjects1[i].powerstats.power)
    app.emptyarray.push(app.uniqueHeroObjects1[i].powerstats.speed)
    app.emptyarray.push(app.uniqueHeroObjects1[i].powerstats.strength)
    let num = app.emptyarray.map(function (x) {
        return parseInt(x, 10);
    });
    console.log(num)
    const reducer = (add, total) => add + total;
    let total = num.reduce(reducer);
    console.log(total)

}
// ASYNC FUNCTION
app.getData = async function Data() {
    app.firstHeroName = await app.getHero1(app.characters1); 
    console.log(app.firstHeroName)
    app.secondHeroName = await app.getHero2(app.characters2);
    app.displayHero(app.firstHeroName, app.secondHeroName);
    if (app.firstHeroName.results.length < 2 && app.secondHeroName.results.length < 2) {
        this.myChart1(app.firstHeroName);
        this.myChart2(app.secondHeroName);
        $('html, body').animate({
            scrollTop: $('#finalResults').offset().top
        }, 1000);
    }
    app.displaySpeechBubble(app.firstHeroName, app.secondHeroName);
    app.submitEvent();

    
}
// SUBMIT FUNCTION OF SEARCH HERO FORM
app.event = function () {
    $('.searchHero').on('submit', function (e) {
        e.preventDefault();
        app.characters1 = [];
        app.characters2 = [];
        app.heroInput1 = $('.hero1').val().trim();
        app.heroInput2 = $('.hero2').val().trim();
        app.searchValue1 = app.characters1.push($('.hero1').val());
        app.searchValue2 = app.characters2.push($('.hero2').val());
        app.getData();
    });
}  
// INIT 
app.init = function () {
    app.getHero1();
    app.getHero2();
    app.event();
};
// DOC READY
$(function () {
    app.init();
    
});

