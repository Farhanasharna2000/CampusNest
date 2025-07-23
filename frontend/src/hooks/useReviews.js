import { useState, useEffect, useCallback } from "react";
import useAxiosPublic from "./useAxiosPublic";

export const useReviews = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all reviews
  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get("/reviews");

      setReviews(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [axiosPublic]);

  // Add a new review
  const addReview = async (reviewData) => {
    try {
      const response = await axiosPublic.post("/reviews", reviewData);

      if (response.status === 200 || response.status === 201) {
        await fetchReviews(); // Refresh reviews
        return { success: true, message: "Review added successfully" };
      } else {
        return {
          success: false,
          message: response.data?.message || "Failed to add review",
        };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: "Error adding review" };
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    addReview,
    fetchReviews,
  };
};
