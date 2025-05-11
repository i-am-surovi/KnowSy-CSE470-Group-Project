import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";

// update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail Not Attached" });
    }

    const parsedCourseData = await JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({ success: true, message: "Course Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get Educator Courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Educator Dashboard Data (Total Earning, Enrolled Students, No. of Courses)

export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);
    // Calculate total earning from purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // Collect unique enrolled student IDs with their course titles
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Enrolled Students Data with Purchase Data
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const educatorId = req.auth.userId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    // Optional: check if the course belongs to the logged-in educator
    if (course.educator.toString() !== educatorId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this course" });
    }
    // Delete course thumbnail from Cloudinary (if applicable)
    const publicId = course.courseThumbnail?.split("/")?.pop()?.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`your_cloudinary_folder/${publicId}`);
    }
    await course.deleteOne();
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update Course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseData } = req.body;  // Assuming courseData is a JSON object containing updated course data
    const imageFile = req.file; // Optional: handle image upload for course thumbnail

    // Find the course by ID
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Ensure the logged-in educator is the owner of the course
    const educatorId = req.auth.userId;
    if (course.educator.toString() !== educatorId.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized to update this course" });
    }

    // Update course data
    const parsedCourseData = JSON.parse(courseData);

    // If an image is uploaded, handle Cloudinary upload
    if (imageFile) {
      const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.path);
      parsedCourseData.courseThumbnail = cloudinaryResponse.secure_url;
    }

    // Update the course with new data
    Object.assign(course, parsedCourseData);
    await course.save();

    res.status(200).json({ success: true, message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
