import React, { Component } from "react";

class News extends Component {


  render() {
    let desc = this.props.data.description ? this.props.data.description.split('').slice(0, 100).join('') : null;
    if (this.props.data.description !== null && this.props.data.description.length > 100) desc += "..."
    return (
      <div className="article" >
        <h6 className="title" >
          <p>{this.props.data.title}</p>
          {(true) ? <p className="desc">{desc}</p> : null}
          <p className="source">{this.props.data.source.name}</p>
        </h6>
      </div>
    );
  }
}

export default News;
