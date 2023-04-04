import NewsAPI, { INewsApiResponse, INewsApiEverythingParams, INewsApiTopHeadlinesParams } from "ts-newsapi";
import config from "../config";

export class News {
    private newsAPI = new NewsAPI(config.newsToken);

    async getEverythingDescription(params: INewsApiEverythingParams): Promise<string[]> {
        const response = await this.newsAPI.getEverything(params);

        let result = response.articles.map(e => {
            return e.description!;
        })

        return result;
    }

    async getEverythingFormatted(params: INewsApiEverythingParams): Promise<string[]> {
        const response = await this.newsAPI.getEverything(params);

        let result = response.articles.map(e => {
            return `<b>${e.title}</b>\n\n` +
                `${e.description}\n\n` +
                `${e.author} - <a href="${e.url}">${e.source.name}</a>`;
        })
        return result;
    }

    async getTopHeadlinesFormatted(params: INewsApiTopHeadlinesParams): Promise<string[]> {
        const response = await this.newsAPI.getTopHeadlines(params);

        console.log(response.articles.length);

        let result = response.articles.map(e => {
            return `<b>${e.title}</b>\n\n` +
                `${e.description}\n\n` +
                `${e.author} - <a href="${e.url}">${e.source.name}</a>`;
        })
        return result;
    }
}

export default new News();