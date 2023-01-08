import React from 'react'
import { NavLink } from 'react-router-dom';
function Feature() {
    return (
        <>
            <div className="feature-intro">
                <h1>Why ExamPedia ?</h1>
                <p>Maximize your learning and reach your academic goals with our user-friendly platform. Join now and get access to a wide range of notes and previous year questions, as well as the support of a community of like-minded students</p>
            </div>
            <div className="feature">
                <div className="feature-card">
                    <div className="feature-image-1">
                        <img src="https://i.postimg.cc/NjbWm7Mv/image-removebg-preview-1.png" alt="" srcset="" />
                    </div>
                    <div className="feature-heading">
                        <h1>Notes</h1>
                    </div>
                    <div className="feature-para">
                        <p>Enhance your studies and ace your exams with our comprehensive and thoroughly researched notes. Download now and get access to the top-quality resources you need to succeed!</p>
                    </div>
                    <div className="feature-button">
                        <NavLink exact to="/notes">
                            <button className="feature-note-button">
                                Note
                            </button>
                        </NavLink>



                    </div>
                </div>



                <div className="feature-card">
                    <div className="feature-image-2">
                        <img src="https://i.postimg.cc/4d5ZdK0W/ezgif-com-gif-maker-2.gif" alt="" srcset="" />
                    </div>
                    <div className="feature-heading">
                        <h1>Upload</h1>
                    </div>
                    <div className="feature-para">
                        <p>Join our community of learners and share your knowledge with others. Upload your notes and previous year questions now and help fellow students succeed in their studies. </p>
                    </div>
                    <div className="feature-button">
                        <NavLink exact to="/upload">
                            <button className="feature-upload-button">
                                Upload
                            </button>
                        </NavLink>



                    </div>
                </div>

                <div className="feature-card">
                    <div className="feature-image-3">
                        <img src="https://i.postimg.cc/DyGGSBxm/ezgif-com-gif-maker-1-removebg-preview.png" alt="" srcset="" />
                    </div>
                    <div className="feature-heading">
                        <h1>PYQ</h1>
                    </div>
                    <div className="feature-para">
                        <p>Get ahead to your studies and give yourself a competitive edge with our extensive collection of previous year questions. Download now and get instant access to a wealth of material!</p>
                    </div>
                    <div className="feature-button">
                        <NavLink exact to="/pyq">
                            <button className="feature-pyq-button">
                                PYQ
                            </button>
                        </NavLink>

                    </div>
                </div>
            </div>

            
        </>
    )
}

export default Feature
