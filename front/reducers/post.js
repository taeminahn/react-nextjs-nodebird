import shortId from 'shortid';
import {faker} from "@faker-js/faker";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
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
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

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
    case LIKE_POST_REQUEST: {
      return {
        ...state,
        likePostLoading: true,
        likePostDome: false,
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
        likePostDome: true,
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
        unlikePostDome: false,
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
        unlikePostDome: true,
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
        loadPostsDome: false,
        loadPostsError: null,
      };
    }
    case LOAD_POSTS_SUCCESS:{
      const mainPosts = state.mainPosts.concat(action.data);
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsDome: true,
        mainPosts: mainPosts,
        hasMorePosts: mainPosts.length < 50,
      };
    }
    case LOAD_POSTS_FAILURE: {
      return {
        ...state,
        loadPostsLoading: false,
        loadPostsError: action.error,
      }
    }
    case ADD_POST_REQUEST: {
      return {
        ...state,
        addPostLoading: true,
        addPostDome: false,
        addPostError: null,
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        addPostLoading: false,
        addPostDome: true,
        mainPosts: [action.data, ...state.mainPosts],
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
        removePostDome: false,
        removePostError: null,
      };
    }
    case REMOVE_POST_SUCCESS: {
      return {
        ...state,
        removePostLoading: false,
        removePostDome: true,
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
        addCommentDome: false,
        addCommentError: null,
      };
    }
    case ADD_COMMENT_SUCCESS: {
      console.log("reducers", action.data);
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.PostId);
      const post = {...state.mainPosts[postIndex]};
      post.Comments = [action.data, ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDome: true,
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