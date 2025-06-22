import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import CatWalk from './CatWalk'
import './News.css'
import cat_logo from '../assets/images/cat_logo.jpg'
import intro_pic from '../assets/images/intro_pic.jpg'
import cat_icon from '../assets/images/catIcon.png'
import blogImg1 from '../assets/images/first_blog_image.png'
import blogImg2 from '../assets/images/second_blog_image.png'
import blogImg3 from '../assets/images/third_blog_image.png'
import blogImg4 from '../assets/images/fourth_blog_image.png'
import axios from 'axios'
import NewsModal from './NewsModal'
import Bookmarks from './Bookmarks' 
import BlogsModal from './BlogsModal'

const categories = ["general", "world", "business", "technology", "entertainment", "sports", "science", "health", "nation"]


const News = ({onShowBlogs, blogs, onEditBlog, onDeleteBlog}) => {
    const[headline, setHeadline] = useState(null)
    const[news, setNews] = useState([])
    const[selectedCategory, setSelectedCategory] = useState('general')
    const[searchInput, setSearchInput] = useState("")
    const[searchQuery, setSearchQuery] = useState("")
    const[showModal, setShowModal] = useState(false)
    const[selectedArticle, setSelectedArticle] = useState(null)
    const[bookmarks, setBookmarks] = useState([])
    const[showBookmarksModal, setShowBookmarksModal] = useState(false)
    const[selectedPost, setSelectedPost] = useState(null)
    const[showBlogModal, setShowBlogModal] = useState(false)

    useEffect(() => {
        const fetchNews = async () => {
            let url = `https://newsdata.io/api/1/latest?apikey=pub_8021211c2c22abb01fc9ac79e644bd8678be3&q=${selectedCategory}&language=en&country=in`;
            
            if (searchQuery) {
                url = `https://newsdata.io/api/1/latest?apikey=pub_8021211c2c22abb01fc9ac79e644bd8678be3&q=${encodeURIComponent(searchQuery)}&language=en&country=in`;
            }


            try {
                const response = await axios.get(url);
                const fetchedNews = response.data["results"];
    
                setHeadline(fetchedNews[0]);
                setNews(fetchedNews.slice(1, 7));

                const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
                setBookmarks(savedBookmarks)
                // console.log(fetchedNews);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            }
        };
    
        fetchNews();
    }, [selectedCategory, searchQuery]);
    

    const handleCategoryClick = (e, category) => {
        e.preventDefault()
        setSelectedCategory(category)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchQuery(searchInput)
        setSearchInput('')
    }

    const handleArticleClick = (article) => {
        setSelectedArticle(article)
        setShowModal(true)
    }

    const handleBookmarkClick = (article) => {
        setBookmarks((prevBookmarks) => {
            const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title === article.title)
            ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title) : [...prevBookmarks, article]
            localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
            return updatedBookmarks
        })
    }

    const handleBlogClick = (blog) => {
        setSelectedPost(blog)
        setShowBlogModal(true)
    }

    const closeBlogModal = () => {
        setShowBlogModal(false)
        setSelectedPost(null)
    }

  return (
    <div className='news'>
        <header className="news-header" >
            <CatWalk />
            <div className='blog-title'>
                <img src={cat_logo} alt="Cat Icon" />
                <h1 className="logo">Meows & Blogs</h1>
            </div>
            
            <div className="search-bar">
                <form onSubmit = {handleSearch}>
                    <input type='text' placeholder='Search News...' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                    <button type='submit'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </header>
        <div className="news-content">
            <div className="navbar">
                <div className="user" onClick={onShowBlogs}>
                    <img src={intro_pic} alt="My image" />
                    <p>Sahi's Blog</p>
                </div>
                <nav className="categories">
                    <h1 className="nav-heading">Categories</h1>
                    <ul className="nav-links">
                    {categories.map((category) => (
                        <li key={category}>
                        <a
                            href="#"
                            className={`nav-link ${selectedCategory === category ? 'active-category' : ''}`}
                            onClick={(e) => handleCategoryClick(e, category)}
                        >
                            {category}
                        </a>
                        </li>
                    ))}
                    <li>
                        <a href="#" className="nav-link" onClick={() => setShowBookmarksModal(true)}>
                        Bookmarks <i className="fa-regular fa-bookmark"></i>
                        </a>
                    </li>
                    </ul>
                </nav>
            </div>
            <div className="news-section">
                {headline && (
                <div className="headline" onClick={() => handleArticleClick(headline)}>
                <img src={headline?.image_url || cat_icon} alt="Technology image" />
                <h2 className="headline-title">
                {headline?.title || "Loading headline..."}
                </h2>
                <i className={`${bookmarks.some((bookmark) => bookmark.title === headline.title) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark`} onClick={(e) => {
                    e.stopPropagation()
                    handleBookmarkClick(headline)
                    }}></i>
                </div>

                )} 
                <div className="news-grid">
                    {news.map((article, index) => (
                        <div key={index} className="news-grid-item" onClick={() => handleArticleClick(article)}>
                        <img src={article?.image_url || cat_icon} alt={article.title} />
                        <h3>{article.title}
                        <i
                        className={`fa ${bookmarks.some((bookmark) => bookmark.title === article.title) ? "fa-solid" : "fa-regular"} fa-bookmark bookmark`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleBookmarkClick(article);
                        }}
                        ></i>
                        </h3>
                    </div>
                    ))}
                    
                </div>
            </div>
            <NewsModal show={showModal} article={selectedArticle} onClose = {() => setShowModal(false)} />
            <Bookmarks show = {showBookmarksModal} bookmarks={bookmarks} onClose={() => setShowBookmarksModal(false)}
                onSelectArticle = {handleArticleClick} onDeleteBookmark={handleBookmarkClick}/>
            <div className="my-blogs">
                <h1 className="my-blogs-heading">My Blogs</h1>
                <div className="blog-posts">
                    {blogs.map((blog, index) => (
                        <div key={index} className='blog-post'onClick={() => handleBlogClick(blog)}>
                            <img src={blog.image || cat_icon} alt={blog.title} />
                            <h3>{blog.title}</h3>
                            {/* <p>{blog.content}</p> */}
                            <div className="post-buttons">
                                <button className="edit-post" onClick={() => {onEditBlog(blog)}}>
                                    <i className="bx bxs-edit" ></i>
                                </button>
                                <button className="delete-post" onClick={(e) => {e.stopPropagation()
                                        onDeleteBlog(blog)}}>
                                    <i className="bx bxs-x-circle"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedPost && showBlogModal && (
                    <BlogsModal show={showBlogModal} blog={selectedPost} onClose={closeBlogModal} />
                )}
                
                </div>
            <div className="weather-calendar">
                <Weather />
                <Calendar />
            </div>
        </div>
        <footer className="news-footer">
            <p>
                😸 Made with ❤️ by Padmasahithi Kondeti 😸
            </p>
        </footer>
    </div>
  )
}

export default News