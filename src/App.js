import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [books, setBooks] = useState();
  const [bookDetails, setBookDetails] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef();

  useEffect(() => {
    fetch("./books.json").then((books) => books.json()).then(books => {
      setBooks(books?.results?.books);
    })
  }, [])

  useEffect(() => {
    document.querySelector('.detail-row')?.scrollIntoView();
  }, [bookDetails])

  return (
    <>
      <header className='p-4'>
        <img
          src='/assets/bmuse_logo.png'
          alt='headerLogo' />
        <span className='header-icon'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 30 30" width="25px" height="25px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" /></svg>
        </span>
      </header>
      <div className='title ps-5'>
        Bookshelf &
      </div>
      <div className='title ps-5'>
        Book Racks
      </div>
      <div className='description-text ps-5 py-3'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </div>
      <h4 className='category-title ps-5 py-2'>Hardcover Fiction</h4>
      <div className='books-scroll'>
        {scrollPosition !== 0 && <button type='button' title='left-nav' onClick={() => {
          scrollRef.current.scrollBy(-200, 0);
        }} className='left-nav'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
          </svg>
        </button>}
        <div ref={scrollRef} className='book-row px-5' onScroll={() => {
          setScrollPosition(document.querySelector('.book-row').scrollLeft)
        }}>
          {books?.sort((book1, book2) => book2.rating - book1.rating).map(book => (
            <div key={book.title} className='book' onClick={() => {
              setBookDetails(book)
            }}>
              <img key={book.title} className={book.title === bookDetails?.title ? 'book-highlight book-image' : 'book-image'} alt={book.title} src={book.book_image} />
              <div className='book-title'>{book.title}</div>
              <div className='book-author'>{book.author}</div>
              <div className='book-publisher'>{book.publisher}</div>
              <div className='book-rating'>{book.rating} out of 5</div>
            </div>
          ))}
        </div>
        {scrollPosition !== (document.querySelector('.book-row')?.scrollWidth - document.querySelector('.book-row')?.clientWidth) && <button type='button' className='right-nav' onClick={() => {
          scrollRef.current.scrollBy(200, 0);
        }} title='right-nav'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
          </svg>
        </button>}
      </div>
      {bookDetails && <div className='detail-row ps-5'>
        <div className='detail-left'>
          <div className='detail-title'>
            <span>{bookDetails.title}</span>
          </div>
          <img key={bookDetails.title} className='detail-image' alt={bookDetails.title} src={bookDetails.book_image} />
          <button type='button' className='add-to-favorite'>
            <span style={{ color: "#fff" }}>Add to Favorites</span>
            <svg fill='#fff' className='float-end me-2' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
          </button>
        </div>
        <div className='detail-right'>
          <div className='detail-author'>
            <span>{bookDetails.author}</span>
            <svg className='me-4' style={{ float: 'right', cursor: 'pointer' }} height='24px' width='24px' onClick={() => setBookDetails(undefined)} >
              <polygon fill='#fff' points='24,2.6 21.4,0 12,9.4 2.6,0 0,2.6 9.4,12 0,21.4 2.6,24 12,14.6 21.4,24 24,21.4 14.6,12 ' />
            </svg>
          </div>
          <div className='detail-publisher'>{bookDetails.publisher}</div>
          <div className='detail-desription'>{bookDetails.description}</div>
        </div>
      </div>}
    </>
  );
}

export default App;
