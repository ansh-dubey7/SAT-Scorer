import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from "../components/Hero"
import TestSection from "../components/TestSection"
import TestimonialSection from "../components/Testimonials"
import ExploreCourse from "../components/ExploreCourse"
import FeaturesSection from '../components/FeaturesSection'
import ExamBlock from "../components/ExamBlock"
import DashboardHeader from '../Student/components/DashboardHeader'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Header/>
        <Hero/>
        <ExamBlock/>
        <FeaturesSection/>
        <TestSection/>
        <ExploreCourse></ExploreCourse>
        <TestimonialSection></TestimonialSection>
        <Footer></Footer>
        <Link to={'/studentdashboard'}>dashboard</Link>
    </div>
  )
}

export default Home