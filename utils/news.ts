import NewsAPI, { INewsApiResponse, INewsApiEverythingParams, INewsApiTopHeadlinesParams, INewsApiArticle } from "ts-newsapi";
import config from "../config";

export class News {
    private newsAPI = new NewsAPI(config.newsToken);

    async getEverythingDescription(params: INewsApiEverythingParams): Promise<string[]> {
        const response: INewsApiResponse = await this.newsAPI.getEverything(params);

        const articles: string[] = [];

        response.articles.forEach((article: INewsApiArticle) => {
            if (article.description) articles.push(article.description);
        });

        return articles;
    }

    async getEverythingFormatted(params: INewsApiEverythingParams): Promise<string[]> {
        const response: INewsApiResponse = await this.newsAPI.getEverything(params);

        const articles: string[] = response.articles.map((article: INewsApiArticle) => {
            return `<b>${article.title}</b>\n\n` +
                `${article.description}\n\n` +
                `${article.author} - <a href="${article.url}">${article.source.name}</a>`;
        });

        return articles;
    }

    async getTopHeadlinesFormatted(params: INewsApiTopHeadlinesParams): Promise<string[]> {
        const response: INewsApiResponse = await this.newsAPI.getTopHeadlines(params);

        const articles: string[] = response.articles.map((article: INewsApiArticle) => {
            return `<b>${article.title}</b>\n\n` +
                `${article.description}\n\n` +
                `${article.author} - <a href="${article.url}">${article.source.name}</a>`;
        })

        return articles;
    }
}

export default new News();