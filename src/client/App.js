import React, { Component } from 'react';
import axios from 'axios';
import './app.css';
import Masonry from "react-masonry-component";
import InfiniteScroll from "react-infinite-scroller";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const masonryOptions = {
  transitionDuration: 0
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      content: [],
      value: 'react',
      isOpen: false,
      index: 5,
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadFunc = this.loadFunc.bind(this);
    this.myRef = React.createRef();
  }

  handleSubmit(event) {
    this.setState({ content: [], count: 0, loading: true })
    axios({
      method: 'post',
      url: '/api/giphy',
      offset: this.state.count,
      data: { query: this.myRef.current.value }
    })
    .then(res => {
      if (!res.data.message) {
        this.renderGifs(res.data.data)
      }
    })
    event.preventDefault();
  }

  loadFunc() {
    const { content } = this.state
    if (content.length >= 1) {
      axios({
        method: 'post',
        url: '/api/giphy',
        data: {
          query: this.myRef.current.value,
          offset: this.state.count
        }
      })
      .then(res => {
        if (!res.data.message) {
          this.renderGifs(res.data.data)
        }
      });
    }
  }

  renderGifs(data) {
    let contentAll = this.state.content

    contentAll.push(data.map((image, index) => {
      return (
        <img key={index} src={image.images.original.url} style={{ width: "25%" }}
             onClick={() => this.getIndex(image.images.original.url)}/>
      );
    }))
    this.setState({
      content: Array.prototype.concat.apply([], contentAll),
      count: this.state.count + 25
    });
  }

  getIndex(data) {
    let index = this.state.content.findIndex(i => i.props.src === data)
    this.setState({ index: index, isOpen: true })
  }

  render() {
    const { content, isOpen, index, loading } = this.state
    return (
      <div>
        <header className={'header'}>
          <form onSubmit={this.handleSubmit}>
            <label>
              Search:
              <input className={'searchBar'} type="text" ref={this.myRef}/>
            </label>
            <input className={'submitButton'} type="submit" value="ZOEK NU"/>
          </form>
        </header>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadFunc}
            hasMore={true || false}
            loader={
              <div className="loader" key={200}>
              </div>
            }
            threshold={200}
          >
            <div className={'container'}>
              <Masonry
                className={"my-gallery-class"} // default ''
                elementType={"div"} // default 'div'
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                {content}
              </Masonry>
            </div>
          </InfiniteScroll>
          {isOpen && content[0] && (
            <Lightbox
              mainSrc={content[index].props.src}
              nextSrc={content[index].props.src}
              prevSrc={content[index].props.src}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() => {
                if (this.state.index > 0) {
                  this.setState({
                    index: this.state.index - 1,
                  });
                }
              }}
              onMoveNextRequest={() => {
                if (this.state.content.length - 5 >= this.state.index) {
                  this.loadFunc()
                }
                this.setState({
                  index: this.state.index + 1
                });
              }}
            />
          )}
      </div>
    );
  }
}

export default App;
