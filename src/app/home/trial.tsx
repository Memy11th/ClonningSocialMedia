'use client'
import React, { useState, useEffect } from 'react';
import LoadingSekeleton from '../_Components/loadingSkeleton';
import { Box, Grid, Pagination, Stack } from '@mui/material';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch posts based on the current page
  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://linked-posts.routemisr.com/posts?page=${page}`,
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjZmYmNmMmE4MDNmNzZiZjAwNWQwOWVmIiwiaWF0IjoxNzI4MzI5ODUzfQ.1aCHpJMVdW_M7nySJaLFzXJQYkfKUDPeAR_m1bhwxCg",
          },
          method: 'GET',
        }
      );

      if (!response.ok) {
        console.error('Failed to fetch posts');
        return;
      }

      const data = await response.json();
      setPosts(data.posts || []);  // Assuming 'posts' contains the posts array
      setTotalPages(data.paginationInfo.numberOfPages); // Update total pages based on the API response
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts whenever the currentPage changes
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  // Function to handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Update current page
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {loading
          ? Array(6)
              .fill()
              .map((_, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <LoadingSekeleton post={null} loading={true} />
                </Grid>
              ))
          : posts.length > 0
          ? posts.map((post, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <LoadingSekeleton post={post} loading={false} />
              </Grid>
            ))
          : "No posts found"}
      </Grid>

      {/* Pagination Controls */}
      <Stack spacing={2} sx={{ marginTop: 4, justifyContent: 'center', display: 'flex' }}>
        <Pagination
          count={totalPages} // Total number of pages from the API
          page={currentPage} // Current page
          onChange={handlePageChange} // Page change handler
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
            />
          )}
        />
      </Stack>
    </Box>
  );
}
