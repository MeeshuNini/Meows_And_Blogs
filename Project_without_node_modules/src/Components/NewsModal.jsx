import React from 'react'
import demoImg from '../assets/images/demo.jpeg'
import './NewsModal.css'
import './Modal.css'

const NewsModal = ({show, article, onClose}) => {
    if (!show) {
        return null
    }
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <span className="close-button" onClick = {onClose}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            {article && (
                <>
                <img src={article.image_url} alt={article.title} className='modal-image'/>
                <h2 className="modal-title">{article.title}</h2>
                <p className="modal-source">
                    Source:{" "}
                    <a href={article.source_url} target="_blank" rel="noopener noreferrer">
                        {article.source_name}
                    </a>
                </p>
                <p className="modal-date">{new Date(article.pubDate).toLocaleString('en-IN', {month:'short', day: "2-digit", year:'numeric', hour: "2-digit", minute: "2-digit"})}</p>
                <p className="modal-content-text">{article.description}</p>
                <a href={article.link} target = '_blank' rel="noopener noreferrer" className="read-more-link">Read More</a>
                </>
            )}
        </div>
    </div>
  )
}

export default NewsModal