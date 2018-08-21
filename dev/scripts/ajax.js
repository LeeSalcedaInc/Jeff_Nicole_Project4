const weed = {}

weed.apiURL = 'https://www.alphavantage.co/query'
weed.apiKEY = 'PVYE0BRRSFPNQIKP'

const weedSymbols = ['weed.to', 'acb.to', 'cron', 'aph.to', 'acbff', 'gwph', 'stz', 'hmmj.to', 'sprwf', 'cann', 'erbb', 'puf.cn', 'axim', 'gblx', 'budz', 'owcp', 'mym', 'mjne', 'cnab', 'rmhb', 'srna', 'phot', 'insy', 'cbds', 'emmbf', 'agtk', 'zyne', 'xxii', 'aero', 'abbv', 'acan', 'ammj', 'attbf', 'blpg', 'cvsi', 'cara', 'cbis', 'cgrw', 'pkph', 'edxc', 'fbec', 'grnh', 'hemp', 'hlix', 'igc', 'iipr', 'imlff', 'inqd', 'kays', 'kshb', 'ldsyf', 'lxrp', 'mcig', 'mjna', 'mntr','mdcl', 'msrt', 'myhi', 'ndev', 'ntrr', 'ogrmf', 'plpl', 'pntv', 'potn', 'smg', 'sprwf', 'trtc', 'turv', 'twmjf', 'ubqu', 'vpor']

// console.log(weedSymbols.length)

weed.getWeed = function (ticker) { 
    return $.ajax({
        url: weed.apiURL,
        method: 'GET',
        dataType: 'json',
        data: {
            function: 'TIME_SERIES_DAILY',
            apikey: weed.apiKEY,
            format: 'json',
            symbol: ticker,
            outputsize: 'full'
        }
    })
};


const weedRequests = weedSymbols.map(weed.getWeed);
console.log(weedRequests);
// $.when(...weedRequests)
// console.log(weedRequests)
// .then((...weedResponse) => {
//     // console.log(weedResponse)
// })