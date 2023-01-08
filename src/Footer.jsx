import React from 'react'

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-main">
                    <div className="footer-intro">
                        <h1>Stay connected with me </h1>
                    </div>

                    <div className="footer-social">

                        <div className="linkedin">
                            <img src="https://i.postimg.cc/0ynccSBG/linkedin.gif" alt="" srcset="" />

                            <a href="https://www.linkedin.com/in/abhay-mishra-9669711b5/" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Linkedin</h1>
                            </a>

                        </div>

                        <div className="instagram">
                            <img src="https://i.postimg.cc/sDqV1Bcc/instagram.gif" alt="" srcset="" />
                            <a href="https://www.instagram.com/dev_abhaymishra/" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Instagram</h1>
                            </a>

                        </div>

                        <div className="github">
                            <img src="https://i.postimg.cc/yxWH8B3t/github.gif" alt="" srcset="" />
                            <a href="https://github.com/Abdev1205" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Github</h1>
                            </a>

                        </div>

                        <div className="youtube">
                            <img src="https://i.postimg.cc/NjqWWRDW/youtube.gif" alt="" srcset="" />
                            <a href="https://www.youtube.com/c/Abideas" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Youtube</h1>
                            </a>

                        </div>

                        <div className="facebook">
                            <img src="https://i.postimg.cc/FRMMNcmd/facebook.gif" alt="" srcset="" />
                            <a href="https://www.facebook.com/profile.php?id=100067140832883" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Facebook</h1>
                            </a>

                        </div>

                    </div>


                </div>
            <div className="footer-content">
                <h1>Developed and Designed By <a href="https://dev-ab.netlify.app/" target="_blank">Abhay Mishra</a>
                </h1>
            </div>
            </div>
        </>
    )
}

export default Footer
