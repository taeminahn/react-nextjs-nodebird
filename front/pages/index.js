import React, {useEffect} from 'react';
import AppLayout from "../components/AppLayout";
import {useDispatch, useSelector} from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import {LOAD_POSTS_REQUEST} from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";

const Home = () => {

  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.me);
  const {mainPosts, hasMorePosts, loadPostsLoading} = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    if(hasMorePosts){
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
    }
  }, []);

  useEffect(() => {

    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm/>}
      {mainPosts.map((c) => <PostCard key={c.id} post={c}/>)}
    </AppLayout>
  );
}

export default Home;