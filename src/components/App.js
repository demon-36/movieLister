import React, { Component } from 'react';
import MainTitle from './MainTitle';
import Search from './Search'
import MovieList from './MovieList'
import Pagination from './Pagination'
import History from './History';
import Loader from './Loader';
import MovieInfo from './MovieInfo';

class App extends Component {

  constructor() {
    super()
    this.state = {
      movies: [],
      allLangs: [],
      allLangsMapping: {},
      historyData: [],
      searchTerm: '',
      searchLang: '',
      currentMovie: null,
      position: {},
      currentPage: 1,
      totalResults: 0,
      totalPages: 0,
      historyArrLength: 3,
      resultsToBeShown: 60,
      isLoading: true,
      isHover: false,
      isSearchHistoryShown: false
    };

    this.apiKey = process.env.REACT_APP_API_KEY;
    this.domain = process.env.REACT_APP_DOMAIN;
    this.version = process.env.REACT_APP_VERSION;

    this.landingURL = `${this.domain}/${this.version}/movie/upcoming?api_key=${this.apiKey}&{filter}page={page}`;
    this.allLangsURL = `${this.domain}/${this.version}/configuration/languages?api_key=${this.apiKey}`;
    this.searchQueryURL = `${this.domain}/${this.version}/search/movie?api_key=${this.apiKey}&{filter}page={page}`;

  }

  getURLForRequest() {

    let landUrl = this.landingURL;
    let searchUrl = this.searchQueryURL;

    if (!this.state.searchTerm && this.state.searchLang) {
      landUrl = landUrl.replace('{filter}', 'language={lang}&');
      return landUrl;
    }

    if (this.state.searchTerm && !this.state.searchLang) {
      searchUrl = searchUrl.replace('{filter}', 'query={searchQuery}&');
      return searchUrl;
    }

    if (this.state.searchTerm && this.state.searchLang) {
      searchUrl = searchUrl.replace('{filter}', 'query={searchQuery}&language={lang}&');
      return searchUrl;
    }

    landUrl = landUrl.replace('{filter}', '');
    return landUrl;

  }

  componentDidMount() {

    let savedSearchHistory = localStorage.getItem('searchHistory');

    this.setState({ historyData: JSON.parse(savedSearchHistory) });

    this.handleLoadingRequest();

    this.getAllLangs();

  }

  getAllLangs() {

    fetch(this.allLangsURL)
      .then(data => data.json())
      .then(data => {
        if (data) {
          this.setState({ allLangs: [...data] });

          let obj = {};
          for (let i = 0; i < data.length; i++) {
            obj[data[i]['iso_639_1']] = data[i]['english_name'];
          }

          this.setState({ allLangsMapping: obj });
        }
      })

  }

  handleLoadingRequest() {

    let url = this.getURLForRequest();
    if (!url) return;
    url = url.replace('{page}', this.state.currentPage);

    fetch(url)
      .then(data => data.json())
      .then(data => {
        if (data) {
          this.setState({ movies: [...data.results], totalResults: data.total_results, totalPages: data.total_pages });
          this.setState({ isLoading: false })
        }
      });

  }

  handleSearchMovieChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  handleLangChange = (e) => {
    this.setState({ searchLang: e.target.value })
  }

  getSearchHistory() {

    if (!this.state.searchTerm && !this.state.searchLang) return;

    if (this.state.searchTerm && this.state.searchLang) {
      return {
        filters: 2,
        history: {
          movieName: this.state.searchTerm,
          language: this.state.allLangsMapping[this.state.searchLang]
        }
      };
    }

    if (this.state.searchTerm && !this.state.searchLang) {
      return {
        filters: 1,
        history: {
          movieName: this.state.searchTerm
        }
      };
    }

    if (!this.state.searchTerm && this.state.searchLang) {
      return {
        filters: 1,
        history: {
          language: this.state.allLangsMapping[this.state.searchLang]
        }
      };
    }

    return null;

  }

  changeHistory = (ind) => {

    if (ind === -1) {
      this.setState({
        historyData: []
      }, function () {
        localStorage.setItem('searchHistory', JSON.stringify(this.state.historyData));
      });
    }

    else {
      let historyArr = this.state.historyData ? this.state.historyData : [];

      if (historyArr && historyArr.length > 0) {
        historyArr.splice(ind, 1);
        this.setState({ historyData: [...historyArr] });
      }

      localStorage.setItem('searchHistory', JSON.stringify(this.state.historyData));
    }

  }

  handleSubmit = (e) => {

    e.preventDefault();

    this.setState({ currentPage: 1 });

    if (!this.state.searchTerm && !this.state.searchLang) return;

    let searchHistory = this.getSearchHistory();
    let historyArr = this.state.historyData ? this.state.historyData : [];

    if (searchHistory) {
      if (!historyArr || historyArr.length < this.state.historyArrLength) {
        historyArr.unshift(searchHistory)
        this.setState({ historyData: [...historyArr] });
      }

      else {
        historyArr.pop();
        historyArr.unshift(searchHistory);
        this.setState({ historyData: [...historyArr] });
      }
    }

    localStorage.setItem('searchHistory', JSON.stringify(this.state.historyData));

    let url = this.getURLForRequest();
    if (!url) return;

    if (this.state.searchTerm) url = url.replace("{searchQuery}", this.state.searchTerm);
    if (this.state.searchLang) url = url.replace("{lang}", this.state.searchLang);
    if (this.state.currentPage) url = url.replace("{page}", this.state.currentPage);

    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({ movies: [...data.results], totalResults: data.total_results, totalPages: data.total_pages })
      })

  }

  handleHover = (movie) => {

    if (!movie || movie.length < 1) return;

    if (movie[0] === true) {
      this.setState({
        isHover: true,
        currentMovie: movie[1]
      }, function () {
        this.setState({ currentMovie: movie[1] });
      });

    }

    else {
      this.setState({ isHover: false });
    }

  }

  nextPage = (pageNumber) => {

    let url = this.getURLForRequest();
    if (!url) return;

    url = url.replace('{page}', pageNumber);
    url = url.replace('{searchQuery}', this.state.searchTerm);
    url = url.replace('{lang}', this.state.searchLang);
    
    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({ movies: [...data.results], totalResults: data.total_results, currentPage: pageNumber, totalPages: data.total_pages })
      })

  }

  mouseMove = (e) => {

    let pos = {
      x: e.screenX,
      y: e.screenY
    }

    this.setState({ position: pos });

  }

  collapseHistory = (e) => {
    this.setState({ isSearchHistoryShown: !this.state.isSearchHistoryShown });
  }

  render() {

    return (

      this.state.isLoading ? <Loader /> :

        <div>
          <MainTitle />

          <div>
            <Search allLangs={this.state.allLangs} handleSubmit={this.handleSubmit}
              handleMovieChange={this.handleSearchMovieChange} handleLangChange={this.handleLangChange} />

            <History isShown={this.state.isSearchHistoryShown} collapseHistory={this.collapseHistory} historyData={this.state.historyData} changeHistory={this.changeHistory} />

            <MovieList movies={this.state.movies} langs={this.state.allLangsMapping} handleHover={this.handleHover}
              mouseMove={this.mouseMove} />

            {
              this.state.isHover ? <MovieInfo position={this.state.position} currentMovie={this.state.currentMovie} /> : ''
            }
          </div>
          
          {
            this.state.totalResults > 10 ? <Pagination pages={this.state.totalPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''
          }
        </div>
    );

  }

}

export default App;
