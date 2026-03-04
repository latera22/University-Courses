import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

// PDF viewer imports
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Course type
interface Course {
  id: number;
  name: string;
  description: string;
  image: string;
  university: string;
  contentUrl?: string; // PDF or HTML URL
  contentHtml?: string; // Optional: HTML content
}

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/course/${id}`);
        if (typeof response.data === "object" && response.data !== null) {
          setCourse(response.data);
        } else {
          setError("Invalid data received from server.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
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

  if (!course) {
    return (
      <Typography align="center" sx={{ pt: 20 }}>
        Course not found.
      </Typography>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-8">
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

      {/* ===== Reading Section ===== */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4">Read Course Content</h2>

        {/* Render HTML content if available */}
        {course.contentHtml ? (
          <div
            className="prose max-w-full overflow-auto"
            dangerouslySetInnerHTML={{ __html: course.contentHtml }}
          />
        ) : course.contentUrl ? (
          // Render PDF content
          <div className="h-[600px] border rounded-md overflow-hidden">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer fileUrl={course.contentUrl} />
            </Worker>
          </div>
        ) : (
          <Typography>No course content available for reading.</Typography>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;