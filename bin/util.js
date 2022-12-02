const { load } = require('cheerio')
const slugify = require('slugify');
const request = require('request-promise');


const searchResults = async (payload) => {
    let names = []
    const url = `https://gogoanime.ar/search.html?keyword=${payload}`
    const html = await request(url)
    const $ = load(html)
    $(".name").each((_,el) => names.push($(el).text().trim()))
    return names
}
const getPopular = async (pages) => {
    let names = []
    for (let i = 1;i <pages; i++) {
        const url = `https://gogoanime.ar/popular.html?page=${i}`
        const html = await request(url)
        const $ = load(html)
        $(".name").each((_,el) => names.push($(el).text().trim()))
    }
    return names
}
const getEpisodes = async (name) => {
    const cleaned_name = slugify(name.toLowerCase().replace(/[\\\.\+\*\?\^\$\[\]\(\)\{\}\/\'\#\:\!\=\|]/ig,''),'-')
    const url = `https://gogoanime.ar/category/${cleaned_name}`
    const html = await request(url)
    const $ = load(html)
    return  $("#episode_page > *:last-child > a").text().trim().split('-')[1]
}

const getEpisodeLink = async (name,episode) => {
    const cleaned_name = slugify(name.toLowerCase().replace(/[\\\.\+\*\?\^\$\[\]\(\)\{\}\/\'\#\:\!\=\|]/ig,''),'-')
    const url = `https://gogoanime.ar/${cleaned_name}-episode-${episode}`
    const html = await request(url)
    const $ = load(html)
    return 'https:' + $("iframe").attr('src')
    
}

module.exports = {
    searchResults,
    getEpisodes,
    getEpisodeLink,
    getPopular
}