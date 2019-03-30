import React, { Component } from "react";
import Article from './Article';

class News extends Component {

  constructor(props) {
    super(props);

    this.state = {news: []}

    this.loadData = this.loadData.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  render() {

    const newsFeed = this.state.news.slice(0,5).map(article =>
      <Article key={article.id} data={article} />
    );

    return (
      <div id="news">
        <h5 className="green-header">NYHETER</h5>
        {newsFeed}
      </div>
    );
  }

  componentDidMount() {
    this.loadData();
    this.timer = setInterval(()=> this.loadData(), 1000000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async loadData() {

    fetch("https://newsapi.org/v2/top-headlines?country=se&apiKey=64c4bd1404fb41c9a2dc1680480a0748")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Tokigt i nyhetsrequesten')
          return [];
        }
      })
      .then(data => {
        this.sortData(data.articles);
      })
      .catch(error => console.error(error));
  }

  sortData(articles) {
    var news = [];
    var count = 0;
    articles.forEach(a => {
      a.id = count;
      news.push(a);
      count++;
    });

    this.setState({news});
  }

}

export default News;
