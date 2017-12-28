import React, { Component } from "react";
import Article from './Article';

class News extends Component {

  constructor(props) {
    super(props);

    this.state = {gp: [], tc:[]}

    this.loadData = this.loadData.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  render() {

    const gpFeed = this.state.gp.slice(0,3).map(article =>
      <Article key={article.id} data={article} />
    );

    const tcFeed = this.state.tc.slice(0,3).map(article =>
      <Article key={article.id} data={article} />
    );

    return (
      <div id="news">
        <h5 className="green-header">Göteborgs-Posten</h5>
        {gpFeed}
        <h5 className="green-header">TechCrunch</h5>
        {tcFeed}
      </div>
    );
  }

  componentDidMount() {
    this.loadData();
    this.timer = setInterval(()=> this.loadData(), 300000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async loadData() {

    fetch("https://newsapi.org/v2/top-headlines?sources=techcrunch,goteborgs-posten&apiKey=64c4bd1404fb41c9a2dc1680480a0748")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.sortData(data.articles);
      })
      .catch(error => console.log(error));
  }

  sortData(articles) {
    var gp = [];
    var tc = [];
    var count = 0;
    articles.forEach(a => {
      a.id = count;
      if (a.source.id === "goteborgs-posten")
        gp.push(a);
      else
        tc.push(a);
      count++;
    });

    this.setState({gp: gp, tc: tc});
  }

}

export default News;
