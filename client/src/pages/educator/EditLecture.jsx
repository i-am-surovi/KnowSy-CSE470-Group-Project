import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const EditLecture = () => {
  const { backendUrl, getToken } = useContext(AppContext);
  const { courseId, lectureId } = useParams(); // Extract courseId and lectureId from the URL
  const navigate = useNavigate();

  const [lectureData, setLectureData] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const fetchLectureData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        `${backendUrl}/api/educator/course/${courseId}/lecture/${lectureId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setLectureData({
          lectureTitle: data.lecture.lectureTitle,
          lectureDuration: data.lecture.lectureDuration,
          lectureUrl: data.lecture.lectureUrl,
          isPreviewFree: data.lecture.isPreviewFree,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Failed to fetch lecture: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchLectureData();
  }, [courseId, lectureId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedLectureData = {
        lectureTitle: lectureData.lectureTitle,
        lectureDuration: lectureData.lectureDuration,
        lectureUrl: lectureData.lectureUrl,
        isPreviewFree: lectureData.isPreviewFree,
      };

      const token = await getToken();
      const { data } = await axios.put(
        `${backendUrl}/api/educator/course/${courseId}/lecture/${lectureId}`,
        updatedLectureData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate(`/educator/course/${courseId}`); // Navigate back to the course page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Failed to update lecture: ${error.message}`);
    }
  };

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:pb-0 p-4 pt-8 pb-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full text-gray-500"
      >
        {/* Lecture Title */}
        <div className="flex flex-col gap-1">
          <p>Lecture Title</p>
          <input
            onChange={(e) =>
              setLectureData({ ...lectureData, lectureTitle: e.target.value })
            }
            value={lectureData.lectureTitle}
            type="text"
            placeholder="Enter title"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Lecture Duration */}
        <div className="flex flex-col gap-1">
          <p>Duration (in minutes)</p>
          <input
            onChange={(e) =>
              setLectureData({ ...lectureData, lectureDuration: e.target.value })
            }
            value={lectureData.lectureDuration}
            type="number"
            placeholder="Duration"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Lecture URL */}
        <div className="flex flex-col gap-1">
          <p>Lecture URL</p>
          <input
            onChange={(e) =>
              setLectureData({ ...lectureData, lectureUrl: e.target.value })
            }
            value={lectureData.lectureUrl}
            type="url"
            placeholder="Enter video URL"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500"
            required
          />
        </div>

        {/* Free Preview Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={lectureData.isPreviewFree}
            onChange={(e) =>
              setLectureData({
                ...lectureData,
                isPreviewFree: e.target.checked,
              })
            }
          />
          <label>Is this a free preview?</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white py-3 rounded-lg">
          Save Lecture
        </button>
      </form>
    </div>
  );
};

export default EditLecture;
