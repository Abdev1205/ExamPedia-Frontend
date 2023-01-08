import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
function About() {
  return (
    <>
      <Navbar />
      <div className="about">
        <div className="about-intro">
          <h1>About ExamPedia</h1>
          <p>Welcome to our website. ExamPedia is Developed and Designed by <strong>Abhay Mishra</strong>  which provide comprehensive resource for students, educators, and lifelong learners. Website offer a wide range of notes and study materials on a variety of subjects, as well as pyq to help users test their knowledge and prepare for exams. Join our community of learners and share your knowledge with others. Upload your notes and previous year questions now and help fellow students succeed in their studies</p>

        </div>
        <div className="about-need">
          <h1>Main reason to develop this website are -</h1>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li>It can provide a convenient and accessible way for students to study and review material for exams or assignments.</li>
          </div>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li>It can serve as a supplement to traditional classroom education, providing additional resources for learners to use outside of class.</li>
          </div>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li>It can provide a way for learners to test their knowledge and identify areas where they need further study.</li>
          </div>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li>It can be a useful resource for lifelong learners who are looking to learn new things or brush up on subjects they haven't studied in a while.</li>
          </div>

          <div className="about-need-reason">
            <img src="https://i.postimg.cc/MKKfj2yR/com-gif-maker-5-unscreen.gif" alt="" srcset="" />
            <li>It will be very helpul for student Who always search notes and Pyq before exam days </li>
          </div>
        </div>

        <div className="upcoming-feature">
        <h1>Upcomming Feature</h1>
          <div className="upcoming-feature-1">
          <div className="upcoming-feature-image-1">
            <img src="https://i.postimg.cc/d1ZZ8ByG/ezgif-com-gif-maker-6.gif" alt="" srcset="" />

          </div>
            <p>We are excited to announce that we will be enhancing the search experience by providing suggestions in every input field and offering a range of filters and sorters to give users even more control over their search results. Our goal is to create a user-friendly interface that helps users quickly and easily find what they are looking for, while still offering the flexibility and functionality they need.</p>
          </div>
          <div className="upcoming-feature-2">
          <div className="upcoming-feature-image-2" >

            <img src="https://i.postimg.cc/zvCm6VMV/ezgif-com-gif-maker-7.gif" alt="" srcset="" />
          </div>
            <p>We are expanding our service to help even more students succeed. In the future, we will be adding the ability for students at multiple universities to upload and access study materials, including notes and practice questions. To ensure that our service is organized and easy to use, we will also be introducing an authentication system to categorize students based on their college.</p>
          </div>
        </div>








        <Footer/>

      </div>
    </>
  )
}

export default About
