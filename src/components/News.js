import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 10,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    articles = []
    constructor(props) {
        super(props);
        console.log("I am a constractr from news component");
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            category: this.category,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - iNEWS`;
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&category=${this.props.category}&apiKey=2d7b5138251b4e6d9b8c42c66c22c918&page=1&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handlePrevClick = async () => {
        console.log("prev")
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2d7b5138251b4e6d9b8c42c66c22c918&page=${this.state.page - 1}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        console.log("next")
        this.setState({
            page: this.state.page - 1,
            totalResults: parsedData.totalResults,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        if (!((this.state.page + 1) > Math.ceil(this.state.totalResult / this.props.pagesize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2d7b5138251b4e6d9b8c42c66c22c918&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            console.log("next")
            this.setState({
                page: this.state.page + 1,
                totalResults: parsedData.totalResults,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2d7b5138251b4e6d9b8c42c66c22c918&page=${this.state.page + 1}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        console.log("next")
        this.setState({
            page: this.state.page + 1,
            totalResults: parsedData.totalResults,
            articles: this.state.articles.concat(parsedData.articles),
            loading: false
        })
    };

    render() {
        return (
            <div className='container my-2'>
                <h2 className='text-center my-3'>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className='row'>
                            {this.state.articles.map((element) => {
                                return <div className='col md-4 my-3' key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage ? element.urlToImage : "https://images.hindustantimes.com/tech/img/2023/02/18/1600x900/APPLE-IPHONE-CHINA-3_1663438521234_1663438521234_1676733327089_1676733327089.JPG"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResult / this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News