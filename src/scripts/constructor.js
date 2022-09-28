function infoAnime(title,  url, image, description, type, episodes, status, is_dubbed,is_subbed,is_mature,is_simulcast,maturity_ratings) {
    this.title = title;
    this.url = url;
    this.image = image;
    this.description = description;
    this.type = type;
    this.episodes = episodes;
    this.status = status;
    this.is_dubbed = is_dubbed;
    this.is_subbed= is_subbed;
    this.is_mature = is_mature;
    this.is_simulcast = is_simulcast;
    this.maturity_ratings = maturity_ratings;
  }

function episode(title, url, description, poster,is_dubbed,is_subbed) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.poster = poster;
    this.is_dubbed = is_dubbed;
    this.is_subbed= is_subbed;
}

function trending(title, link, image, bannerImage, description, status, id) {
    this.title = title;
    this.link = link;
    this.image = image;
    this.bannerImage = bannerImage;
    this.description = description;
    this.status = status;
    this.id = id;
}


function finalData (title, image, desc, type, maturity_ratings, link, is_dubbed, is_subbed, is_mature, is_simulcast,season_count,episode_count){
    this.title = title;
    this.image = image;
    this.desc = desc;
    this.type = type;
    this.maturity_ratings = maturity_ratings;
    this.link = link;
    this.is_dubbed = is_dubbed;
    this.is_subbed = is_subbed;
    this.is_mature = is_mature;
    this.is_simulcast = is_simulcast;
    this.season_count = season_count;
    this.episode_count = episode_count;
}
function season(season_number, episodes){
    this.season_number = season_number;
    this.episodes = episodes;
}
export {
    infoAnime,
    episode,
    trending,
    finalData,
    season
}