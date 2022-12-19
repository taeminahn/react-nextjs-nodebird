import shortId from 'shortid';
import {faker} from '@faker-js/faker';

export const initialState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadUserPostsLoading: false,
  loadUserPostsDone: false,
  loadUserPostsError: null,
  loadHashtagPostsLoading: false,
  loadHashtagPostsDone: false,
  loadHashtagPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
 },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image(),
 }],
  Comments: [{
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
   },
    content: faker.lorem.sentence(),
 }],
}));
export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
 },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RETWEET_REQUEST: {
      return {
        ...state,
        retweetLoading: true,
        retweetDone: false,
        retweetError: null,
     };
   }
    case RETWEET_SUCCESS:{
      const mainPosts = [action.data,...state.mainPosts];
      return {
        ...state,
        retweetLoading: false,
        retweetDone: true,
        mainPosts,
     };
   }
    case RETWEET_FAILURE:{
      return {
        ...state,
        retweetLoading: false,
        retweetError: action.error,
     }
   }
    case REMOVE_IMAGE: {
      const imagePaths = state.imagePaths.filter((v, i) => i !== action.data);
      return {
        ...state,
        imagePaths,
     };
   }
    case UPLOAD_IMAGES_REQUEST: {
      return {
        ...state,
        uploadImagesLoading: true,
        uploadImagesDone: false,
        uploadImagesError: null,
     };
   }
    case UPLOAD_IMAGES_SUCCESS:{
      const imagePaths = state.imagePaths.concat(action.data);
      return {
        ...state,
        uploadImagesLoading: false,
        uploadImagesDone: true,
        imagePaths,
     };
   }
    case UPLOAD_IMAGES_FAILURE:{
      return {
        ...state,
        uploadImagesLoading: false,
        uploadImagesError: action.error,
     }
   }
    case LIKE_POST_REQUEST: {
      return {
        ...state,
        likePostLoading: true,
        likePostDone: false,
        likePostError: null,
     };
   }
    case LIKE_POST_SUCCESS:{
      const mainPosts = [...state.mainPosts];
      const likePostIndex = state.mainPosts.findIndex((v) => v.id === action.data.PostId);
      const post = {...state.mainPosts[likePostIndex]};
      post.Likers = post.Likers.concat({id : action.data.UserId});
      mainPosts[likePostIndex].Likers = post.Likers;
      return {
        ...state,
        likePostLoading: false,
        likePostDone: true,
        mainPosts,
     };
   }
    case LIKE_POST_FAILURE:{
      return {
        ...state,
        unlikePostLoading: false,
        unlikePostError: action.error,
     }
   }
    case UNLIKE_POST_REQUEST: {
      return {
        ...state,
        unlikePostLoading: true,
        unlikePostDone: false,
        unlikePostError: null,
     };
   }
    case UNLIKE_POST_SUCCESS: {
      const mainPosts = [...state.mainPosts];
      const unlikePostIndex = state.mainPosts.findIndex((v) => v.id === action.data.PostId);
      const post = {...state.mainPosts[unlikePostIndex]};
      post.Likers =post.Likers.filter((v) => v.id !== action.data.UserId);
      mainPosts[unlikePostIndex].Likers = post.Likers;
      return {
        ...state,
        unlikePostLoading: false,
        unlikePostDone: true,
        mainPosts,
     };
   }
    case UNLIKE_POST_FAILURE: {
      return {
        ...state,
        likePostLoading: false,
        likePostError: action.error,
     }
   }
    case LOAD_POSTS_REQUEST: {
      return {
        ...state,
        loadPostsLoading: true,
        loadPostsDone: false,
        loadPostsError: null,
     };
   }
    case LOAD_POSTS_SUCCESS:{
      const mainPosts = state.mainPosts.concat(action.data);
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDone: true,
        mainPosts,
        hasMorePosts: action.data.length === 10,
     };
   }
    case LOAD_POSTS_FAILURE: {
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsError: action.error,
     }
   }
    case LOAD_USER_POSTS_REQUEST: {
      return {
        ...state,
        loadUserPostLoading: true,
        loadUserPostDone: false,
        loadUserPostError: null,
     };
   }
    case LOAD_USER_POSTS_SUCCESS:{
      const mainPosts = state.mainPosts.concat(action.data);
      return {
        ...state,
        loadUserPostsLoading: false,
        loadUserPostsDone: true,
        mainPosts,
     };
   }
    case LOAD_USER_POSTS_FAILURE: {
      return {
        ...state,
        loadUserPostsLoading: false,
        loadUserPostsError: action.error,
     }
   }
    case LOAD_HASHTAG_POSTS_REQUEST: {
      return {
        ...state,
        loadHashtagPostLoading: true,
        loadHashtagPostDone: false,
        loadHashtagPostError: null,
     };
   }
    case LOAD_HASHTAG_POSTS_SUCCESS:{
      console.log(action)
      const mainPosts = state.mainPosts.concat(action.data);
      return {
        ...state,
        loadHashtagPostsLoading: false,
        loadHashtagPostsDone: true,
        mainPosts,
     };
   }
    case LOAD_HASHTAG_POSTS_FAILURE: {
      return {
        ...state,
        loadHashtagPostsLoading: false,
        loadHashtagPostsError: action.error,
     }
   }
    case LOAD_POST_REQUEST: {
      return {
        ...state,
        loadPostLoading: true,
        loadPostDone: false,
        loadPostError: null,
     };
   }
    case LOAD_POST_SUCCESS:{
      return {
        ...state,
        loadPostLoading: false,
        loadPostDone: true,
        singlePost: action.data,
     };
   }
    case LOAD_POST_FAILURE: {
      return {
        ...state,
        loadPostLoading: false,
        loadPostError: action.error,
     }
   }
    case ADD_POST_REQUEST: {
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
     };
   }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [action.data, ...state.mainPosts],
        imagePaths: [],
     };
   }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
     };
   }
    case REMOVE_POST_REQUEST: {
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
     };
   }
    case REMOVE_POST_SUCCESS: {
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data.PostId),
     };
   }
    case REMOVE_POST_FAILURE: {
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
     };
   }
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
     };
   }
    case ADD_COMMENT_SUCCESS: {
      console.log('reducers', action.data);
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.PostId);
      const post = {...state.mainPosts[postIndex]};
      post.Comments = [action.data, ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
     };
   }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
     };
   }
    default:
      return state;
 }
};

export default reducer;