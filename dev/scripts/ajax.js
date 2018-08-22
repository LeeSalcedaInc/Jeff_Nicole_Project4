const app = {}

app.apiURL = 'http://superheroapi.com';
app.apiKEY = '10205575676227056';


const characters = [];

const searchValue = characters.push($('.hero1').val());
const searchValue2 = characters.push($('.hero2').val());

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
    // .then((res) => {
    //     app.show
    // })
};

// app.getHero();

const characterRequests = characters.map(app.getHero);
$.when(...characterRequests)
    .then((...responses) => {
        responses.map((object) => {
            return (object[0][0]);
        });
        console.log(responses)
    });

app.event = function () {
    $('.searchHero').on('submit', function (e) {
        e.preventDefault();
        console.log(app.getHero(searchValue));
        console.log(app.getHero(searchValue2));
    });
}



app.init = function () {
    app.getHero();
    app.event();
};


$(function () {
    app.init();

});

