import fetch from 'node-fetch';



const getJson = async (url) => {
    const response = await fetch(url);
    return await response.json()
}

//Max limit for Reddit is 100 pictures
const getPicturesWithLimit = async (targetGroup, limit) => {
    const url = `https://www.reddit.com/r/${targetGroup}.json?limit=${limit}`
    const json =  await getJson(url)
    const pictures = json.data.children.map( function(object) {
        return object.data.url_overridden_by_dest || "There are no pictures"
    })
    return await pictures
}

function isToday(timestamp) {

    const todayAtMidnight = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        3, 0, 0, 0 
    )

    // Сравниваем
    return timestamp * 1000 >= +todayAtMidnight
}

const getTodayPictures = async (targetGroup) => {

    const url = `https://www.reddit.com/r/${targetGroup}.json?limit=100`
    const json =  await getJson(url)
    
    const pictures = json.data.children.filter(function(object) {
        return isToday(object.data.created)
    }).map( function(object) {
        return (object.data.url_overridden_by_dest || "There are no pictures")
    })
    return await pictures
    
}

console.log(await getTodayPictures('ProgrammerHumor'))


