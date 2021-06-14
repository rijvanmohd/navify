import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Card from "../common/Card";
import Loader from "react-loader-spinner";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [prevY, setPrevY] = useState(0);
  let loadingRef = useRef();

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    getPosts(page);
  }, [page]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadingRef.current) observer.observe(loadingRef.current);
  }, [handleObserver]);

  const getPosts = (page) => {
    setLoading((prev) => !prev);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then((res) => {
        setPosts((prev) => [...prev, ...res.data]);
        setLoading((prev) => !prev);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        {posts.map((post) => (
          <Card title={post.title} body={post.body} />
        ))}
      </div>
      <div ref={loadingRef}>
        {loading && (
          <Loader type="Oval" color="#00BFFF" height={80} width={80} />
        )}
      </div>
    </div>
  );
}

export default Posts;
