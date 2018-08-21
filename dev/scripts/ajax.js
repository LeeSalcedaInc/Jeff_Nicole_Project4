const app = {}

app.apiURL = 'http://superheroapi.com';
app.apiKEY = '10211233079057278';


const charIDs = [];
for (i = 1; i <= 2; i++) {
    charIDs.push(i);
}

app.getHero = (id) => { 
    return $.ajax({
        url: `${app.apiURL}/api/${app.apiKEY}/${id}`,
        method: 'GET',
        dataType: 'jsonp',
        data: {
            apikey: app.apiKEY,
        }
    });
};

const characterRequests = charIDs.map(app.getHero);
$.when(...characterRequests)
    .then((...responses) => {
        responses.map((something) => {
            console.log(something[0])
        });
    });






