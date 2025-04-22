import React, { use,useEffect } from 'react'
import uniqid from 'uniqid';
import Quill from 'quill'; 

const AddCourse = () => {

  const quillRef = React.useRef(null);
  const editorRef = React.useRef(null);

  const [courseTitle, setCourseTitle] = React.useState('');
  const [coursePrice, setCoursePrice] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [image, setImage] = React.useState(null);
  const [chapters, setChapters] = React.useState([]);
  const [showPopups, setShowPopups] = React.useState(false);
  const [currentChapterId, setCurrentChapterId] = React.useState(null);
  const [lectureDetails, setLectureDetails] = React.useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    }
  );
useEffect(() => {
  if (quillRef.current && editorRef.current) {
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
    });
  }
}, [])



  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:pb-0 p-4 pt-8 pb-0'>
      <form>
      <div className= 'flex flex-col gap-1'>
        <p>Course Title</p>
        <input onChange={e=> setCourseTitle(e.target.value)} value={courseTitle} type="text" placeholder='Type here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-grey-500' required />
      </div>
      <div classname='flex flex-col gap-1'>
        <p>Course Description</p>
        <div ref= {editorRef}></div>

      </div>


      </form>
      <h1>Add Course</h1>
    </div>
  )
}

export default AddCourse