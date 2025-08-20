import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";

interface Course {
  id: number;
  name: string;
  description: string;
  image: string;
  university: string;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // This assumes you have a backend endpoint to get a single course by its ID
        const response = await axios.get(`/api/course/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError("Failed to fetch course details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 20 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ pt: 20 }}>
        {error}
      </Typography>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      {course ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-2">{course.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{course.university}</p>
            <p className="text-gray-800">{course.description}</p>
          </div>
        </div>
      ) : (
        <Typography align="center" sx={{ pt: 20 }}>
          Course not found.
        </Typography>
      )}
    </div>
  );
};

export default CourseDetail;
