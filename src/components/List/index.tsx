import StarPicker from 'react-star-picker';
import { IMG_BASE_URL } from '../../features/moviesAPI';
import { Movie } from '../../features/moviesSlice';
import movieLogo from '../../assets/movie.jpg'

interface ListProps {
    movies?: Movie[];
}

const MovieList = (props: ListProps) => {
    const { movies } = props;

    return !movies || movies.length == 0 ?
        (<h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Nothing to see yet!</h2>) : (
            <section className="page-section portfolio" id="movies">
                <div className="container">
                    <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Movies</h2>
                    <div className="divider-custom">
                        <div className="divider-custom-line"></div>
                        <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                        <div className="divider-custom-line"></div>
                    </div>
                    <div className="row justify-content-center">
                        {movies.map((m, index) =>
                        (<div className="col-md-6 col-lg-4 mb-5" key={index}>
                            <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                                <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                    <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                                </div>
                                {m.name}
                                <StarPicker
                                    disabled
                                    halfStars
                                    size={22}
                                    value={(m.vote_average || 1)/2}
                                    onChange={(value, name) => {
                                        return;
                                    }}
                                />
                                <img className="img-fluid" src={m.img ? `${IMG_BASE_URL}${m.img}` : movieLogo} alt={m.name} />
                            </div>
                        </div>))}
                    </div>
                </div>
            </section>
        );

}

export default MovieList;