import React, {Component} from 'react';

function MovieItem({movie}) {
    return <div style={{display: 'flex', margin: '10px 0'}}>
        <img style={{maxHeight: '100px', paddingRight: '10px'}}
             src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`}/>
        <div>
            <b>{movie.name || movie.original_title}</b>
            <p>Score: {movie.vote_average} / 10</p>
            <div>
                <details>
                    <summary>
                        Overview
                    </summary>
                    {movie.overview}
                </details>
            </div>
        </div>
    </div>
}

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            page: 0,
            total: 0
        }
    }

    componentDidMount = async () => {
        await this.LoadMore();
    }

    LoadMore = async () => {
        const {page} = this.state
        let newPage = page + 1
        return await fetch(`${this.props.url}&page=${newPage}`)
            .then(response => response.json())
            .then(data => {
                let movies = data.results
                let total = data.total_results
                let page = data.page
                // console.log(data)
                this.setState(state => ({
                    movies: [...state.movies, ...movies],
                    total: total,
                    page: page
                }))
            })
            .catch(console.error)
    }

    render() {
        const {movies} = this.state
        return <div>
            <h2>{this.props.title}</h2>
            {movies.map(movie => {
                return <MovieItem key={movie.id} movie={movie}/>
            })}
            <button style={{fontSize: '20px', padding: '10px 20px', cursor: 'pointer'}} onClick={this.LoadMore}>Next
                20
            </button>
        </div>
    }

}
