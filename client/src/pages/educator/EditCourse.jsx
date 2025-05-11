import React, { useContext, useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditCourse = () => {
  const { backendUrl, getToken } = useContext(AppContext);
  const { courseId } = useParams();

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseData, setCourseData] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
 

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(
          `${backendUrl}/api/educator/course/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          const course = data.course;
          setCourseData(course);
          setCourseTitle(course.courseTitle);
          setCoursePrice(course.coursePrice);
          setDiscount(course.discount);
          setChapters(course.courseContent);
          if (quillRef.current) {
            quillRef.current.root.innerHTML = course.courseDescription;
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchCourse();
  }, [courseId, getToken, backendUrl]);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image && !courseData?.courseThumbnail)
      return toast.error("Thumbnail is required");
    if (!quillRef.current || !quillRef.current.root.innerHTML.trim())
      return toast.error("Course description is required");
    if (chapters.length === 0) return toast.error("Add at least one chapter");
    for (const chapter of chapters) {
      if (chapter.chapterContent.length === 0)
        return toast.error("Each chapter must have at least one lecture");
    }

    try {
      const courseUpdatedData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseUpdatedData));
      if (image) formData.append("image", image);

      const token = await getToken();
      const { data } = await axios.put(
        `${backendUrl}/api/educator/course/${courseId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) toast.success("Course updated");
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

const handleChapter = (action, chapterId = null) => {
  switch (action) {
    case "add": {
      const title = prompt("Enter Chapter Name: ");
      if (title) {
        setChapters([
          ...chapters,
          {
            chapterId: uniqid(),
            chapterTitle: title,
            chapterContent: [],
            collapsed: false, // Change this to false to ensure it's not collapsed
            chapterOrder:
              chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
          },
        ]);
      }
      break;
    }
    case "remove":
      setChapters(chapters.filter((c) => c.chapterId !== chapterId));
      break;
    case "toggle":
      setChapters(
        chapters.map((c) =>
          c.chapterId === chapterId ? { ...c, collapsed: !c.collapsed } : c
        )
      );
      break;
    default:
      break;
  }
};


  const handleLecture = (action, chapterId, lectureIndex = null) => {
  if (action === "add") {
    setCurrentChapterId(chapterId);
    setShowPopup(true);
  } else if (action === "remove") {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === chapterId) {
          chapter.chapterContent.splice(lectureIndex, 1); // Removing lecture based on index
        }
        return chapter;
      })
    );
  }
};

const addLecture = () => {
  setChapters(
    chapters.map((chapter) => {
      if (chapter.chapterId === currentChapterId) {
        // Creating new lecture with lectureDetails and ensuring lectureOrder
        const newLecture = {
          ...lectureDetails,
          lectureOrder:
            chapter.chapterContent.length > 0
              ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
              : 1,
          lectureId: uniqid(),
        };
        chapter.chapterContent.push(newLecture); // Adding new lecture to the chapter's content
      }
      return chapter;
    })
  );

  setShowPopup(false);
  setLectureDetails({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });
};

  return (
    <div className="p-4 pt-8 h-screen overflow-scroll">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full text-gray-500"
      >
        <div>
          <p>Course Title</p>
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <p>Course Description</p>
          <div ref={editorRef} className="bg-white border p-2 rounded"></div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div>
            <p>Course Price</p>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              className="border px-3 py-2 rounded w-28"
              required
            />
          </div>

          <div>
            <p>Discount %</p>
            <input
              type="number"
              value={discount}
              min={0}
              max={100}
              onChange={(e) => setDiscount(e.target.value)}
              className="border px-3 py-2 rounded w-28"
              required
            />
          </div>

          <div>
            <p>Thumbnail</p>
            <label className="flex items-center gap-3 cursor-pointer">
              <img src={assets.file_upload_icon} className="p-2 bg-blue-500 rounded" />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              {(image || courseData?.courseThumbnail) && (
                <img
                  className="h-10"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : courseData.courseThumbnail
                  }
                  alt="Thumbnail"
                />
              )}
            </label>
          </div>
        </div>

        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.chapterId} className="border mb-3 rounded">
              <div className="p-3 border-b flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={assets.dropdown_icon}
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    className={`w-4 cursor-pointer transition ${
                      chapter.collapsed ? "-rotate-90" : ""
                    }`}
                    alt=""
                  />
                  <span>
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{chapter.chapterContent.length} Lectures</span>
                  <img
                    src={assets.cross_icon}
                    onClick={() => handleChapter("remove", chapter.chapterId)}
                    className="w-4 cursor-pointer"
                    alt=""
                  />
                </div>
              </div>
              {!chapter.collapsed && (
                <div className="p-3">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500"
                          rel="noreferrer"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        onClick={() =>
                          handleLecture("remove", chapter.chapterId, lectureIndex)
                        }
                        className="w-4 cursor-pointer"
                        alt=""
                      />
                    </div>
                  ))}
                  <div
                    className="text-blue-600 cursor-pointer mt-2"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            onClick={() => handleChapter("add")}
            className="bg-blue-100 text-center py-2 rounded cursor-pointer"
          >
            + Add Chapter
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-3 rounded">
          Update Course
        </button>
      </form>

      {showPopup && (
            <div className="popup-overlay">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>

                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p>Duration (minutes)</p>
                  <input
                    type="number"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex gap-2 my-4">
                  <p>Is Preview Free?</p>
                  <input
                    type="checkbox"
                    className="mt-1 scale-125"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-400 text-white px-4 py-2 rounded"
                  onClick={addLecture}
                >
                  Add
                </button>

                <img
                  onClick={() => setShowPopup(false)}
                  src={assets.cross_icon}
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
  );
};

export default EditCourse;
