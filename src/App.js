import React, { useEffect, useState } from 'react';
import MovieBox from './Components/MovieBox';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const API_URL=`https://api.themoviedb.org/3/movie/popular?api_key=432f8c6c84632855a5f5c5815a81b689&page=1`;
function App() {
  
  const [language, setLanguage] = useState("pt-BR")
  const [movies, setMovies] = useState([]);
  const [query, setQuery]=useState('');
  const [pagePlus, setPaginationPlus]=useState('2')

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
        .then(data => {
          console.log(data);
          setMovies(data.results);
        })
  }, [])

  const moviesPaginationPlus = async(e)=> {
    e.preventDefault();
    try {
      const url=`https://api.themoviedb.org/3/movie/popular?api_key=432f8c6c84632855a5f5c5815a81b689&page=${pagePlus}`;
      const res= await fetch(url);
      const data= await res.json();
      document.querySelector(".next").addEventListener("click", () => {
        setPaginationPlus(data.page + 1);
      })
      if(data.page > 1) {
        document.querySelector(".previous").style.display = "block";
        document.querySelector(".previous").addEventListener("click", () => {
          setPaginationPlus(data.page - 1);
        })
      }
      if(data.page <= 1) {
        document.querySelector(".previous").style.display = "none";
      } 
      
      setMovies(data.results)
    }
    catch(e) {
      console.log(e)
    }
  }

  const appLanguage = async(e)=> {
    e.preventDefault();
    try {
      const url=`https://api.themoviedb.org/3/movie/popular?api_key=432f8c6c84632855a5f5c5815a81b689&page=1&language=${language}`;
      const res= await fetch(url);
      const data= await res.json();
      document.querySelector(".pt").addEventListener("click", () => {
        setLanguage("pt-BR");
      })
      document.querySelector(".en").addEventListener("click", () => {
        setLanguage("en");
      })
      setMovies(data.results)
    }
    catch(e) {
      console.log(e)
    }
  }

  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=432f8c6c84632855a5f5c5815a81b689&query=${query}`;
      const res= await fetch(url);
      const data= await res.json();
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="">MovieDB DOT Digital</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          
          <Navbar.Collapse id="navbarScroll">
              <Nav 
              className="me-auto my-2 my-lg-3"
              style={{maxHeight: '100px'}}
              navbarScroll >
              </Nav>
              <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
              type="search"
              placeholder="Busque um filme"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Buscar</Button>
            </Form>
          </Navbar.Collapse>

        </Container>
      </Navbar>
      <div className='container'>
        <div className='languages d-flex justify-content-center'>
          <button className='pt btn btn-primary' onClick={appLanguage}>
            Português
          </button>
          <button className='en btn btn-primary' onClick={appLanguage}>
            English
          </button>
        </div>
        <div className='grid'>
          { movies.map((movie) => 
            <MovieBox key={movie.id} {...movie} />
        ) }
        </div>
        <div className='pagination justify-content-center'>
          <button style={{display: "none"}} className="previous btn btn-primary me-4" onClick={moviesPaginationPlus}>
            Anterior
          </button> 
          <button className="next btn btn-primary" onClick={moviesPaginationPlus}>
            Próximo
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
