import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const CourseDetails = () => {

  const {id} = useParams()

  const [courseData, setCourseData] = useState(null)

  const {allCourses} = useContext(AppContext)

  const fetchCourseData = async ()=>{
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse);
  }

  useEffect(()=>{
    fetchCourseData()
  }, [])

  return (
    <div >
      {/* left column */}
      <div></div>
      {/* right column */}
      <div></div>
    </div>
  )
}

export default CourseDetails
