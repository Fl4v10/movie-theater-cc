import React, { useEffect, useState } from 'react';
import StarPicker from 'react-star-picker';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import MovieList from './components/List';
import { discoverMoviesThunk, searchMoviesThunk, selectMovies } from './features/moviesSlice';

function App() {
    const dispatch = useAppDispatch();

    const movies = useAppSelector(selectMovies);

    const [searchTerm, setSearchTerm] = useState("");
    const [stars, setStars] = useState<number | null>(10);

    const onInputChange = (event: any) => {
        setSearchTerm(event.target.value);

        if (searchTerm.length > 3)
            dispatch(searchMoviesThunk(searchTerm));
    }

    useEffect(() => dispatch(discoverMoviesThunk()), []);

    const filteredMovies = stars ?
        movies?.filter(f => { if (f.vote_average) return f.vote_average <= (stars) }) : movies;

    return (
        <div id="page-top">
            <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="#page-top">Movie Theater CC</a>
                    <button className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu &nbsp;
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="#movies">Movies</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <header className="masthead bg-primary text-white text-center">
                <div className="container d-flex align-items-center flex-column">
                    <p className="masthead-subheading font-weight-light mb-0">FIND YOUR FAVORITE MOVIE</p>
                    <div className="divider-custom divider-light">
                        <div className="divider-custom-line"></div>
                        <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                        <div className="divider-custom-line"></div>
                    </div>
                    <div className="mb-6">
                        <input className="form-control" id="name" type="text" onChange={onInputChange}
                            placeholder="Search for your movie..." data-sb-validations="required" />
                        <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                        <StarPicker
                            halfStars
                            doubleTapResets
                            size={60}
                            value={(stars || 1) /2}
                            onChange={(value, name) => {
                                var newValue = value ? value * 2 : value;
                                setStars(newValue);
                            }}
                        />
                    </div>
                </div>
            </header>
            <MovieList movies={filteredMovies} />

            <footer className="footer text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <h4 className="text-uppercase mb-4">Location</h4>
                            <p className="lead mb-0">
                                2215 John Daniel Drive
                                <br />
                                Clark, MO 65243
                            </p>
                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <h4 className="text-uppercase mb-4">Around the Web</h4>
                            <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-linkedin-in"></i></a>
                            <a className="btn btn-outline-light btn-social mx-1" href="#!"><i className="fab fa-fw fa-dribbble"></i></a>
                        </div>
                        <div className="col-lg-4">
                            <h4 className="text-uppercase mb-4">About Flávio</h4>
                            <p className="lead mb-0">
                                26yo guy from Brasilia, Brazil!
                                <a href="http://startbootstrap.com">Start Bootstrap</a>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copyright py-4 text-center text-white">
                <div className="container"><small>Copyright &copy; Your Website 2021</small></div>
            </div>
        </div>
    );
}

export default App;