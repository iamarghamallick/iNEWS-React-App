import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = []
    constructor() {
        super();
        console.log("I am a constractr from news component");
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=2d7b5138251b4e6d9b8c42c66c22c918&page=1&pagesize=6";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResult: parsedData.totalResults
        })
    }

    handlePrevClick = async () => {
        console.log("prev")
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2d7b5138251b4e6d9b8c42c66c22c918&page=${this.state.page - 1}&pagesize=6`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        console.log("next")
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async () => {
        if ((this.state.page + 1) > Math.ceil(this.state.totalResult / 6)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2d7b5138251b4e6d9b8c42c66c22c918&page=${this.state.page + 1}&pagesize=6`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            console.log("next")
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }

    render() {
        return (
            <div className='container my-2'>
                <h2>iNews - Top Headlines</h2>
                <div className='row'>
                    {this.state.articles.map((element) => {
                        return <div className='col md-4 my-3' key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/tech/img/2023/02/18/1600x900/APPLE-IPHONE-CHINA-3_1663438521234_1663438521234_1676733327089_1676733327089.JPG"} newsUrl={element.url} />
                        </div>
                    })}

                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResult / 6)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News