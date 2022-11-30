const { load } = require('cheerio')
const slugify = require('slugify');
const request = require('request-promise');

const url = "https://gogoanime.ar/"

const searchResults = async (payload) => {
    let names = []
    try {
        const html = await request(url + `search.html?keyword=${payload}`)
        const $ = load(html)
        let anime = $('li>p.name')

        // console.log(link)
        anime.map((_, e) => names.push($(e).text().trim()))
        return names
    } catch (err) {
        return { status: 'fail', message: err.message }
    }
}

const animeDetails = async (name) => {
    try {
        const keys = ["Type", "Plot Summary", "Genre Action", "Released", "Status", "Other name"]
        let details = {}
        const slugURL = url + '/category/' + slugify(name.toLowerCase().replace(':', '').replace('(', '').replace(')', ''), '-')
        const res = await request(slugURL)
        const $ = load(res)
        $('.anime_info_body_bg>p.type').map((_, el) => {
            let str = $(el).text().trim().replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "").replace(/\s{2,}/, " ")
            keys.forEach(key => {
                if (str.startsWith(key)) {
                    const value = str.replace(key, "").replace(',', "").trim()
                    details[slugify(key, '_')] = value
                }
            })

        })
        return details
    } catch (err) {
        return { status: 'error', message: err.message }
    }
}

//testing
// (async function(){
//     let res = await searchResults('bleach thous')
//     // res.each(el => console.log(slugify(el,'-')))
//     const det = await animeDetails(res[0])
//     console.log(det)
//     const anim = url + slugify(res[0].toLowerCase().replace(':','').replace('(','').replace(')',''),'-') + '-' + 'episode' + '-' + '2' 
//     // console.log(res)
//     const content = await request(anim)
//     const $ = load(content)
//     const iframe = $('iframe').attr('src')
//     console.log("https:" + iframe)
//     console.log(anim)
// })()

module.exports = {
    animeDetails,
    searchResults
}