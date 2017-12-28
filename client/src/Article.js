import React, { Component } from "react";

class News extends Component {

  render() {
    return (
      <div className="article" >
        <h6 className="title" >
          {this.props.data.title}
        </h6>
      </div>
    );
  }
}

export default News;
