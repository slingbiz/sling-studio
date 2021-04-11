import mock from '../../MockConfig';
import {postsList, wallData} from '../../db/apps/wall';

let posts = postsList;

mock.onGet('/wall').reply(200, wallData);

mock.onGet('/wall/posts').reply(200, posts);

mock.onPost('/wall/posts').reply((request) => {
  const {post} = JSON.parse(request.data);
  const newPost = {
    id: Math.floor(Math.random() * 10000),
    date: new Date().toString(),
    likes: 0,
    shares: 0,
    views: 0,
    comments: [],
    ...post,
  };
  posts = [newPost, ...posts];
  return [200, newPost];
});

mock.onPut('/wall/posts').reply((request) => {
  const {postId, status} = JSON.parse(request.data);
  const post = posts.find((item) => item.id === postId);
  post.liked = status;
  if (status) {
    post.likes += 1;
  } else {
    post.likes -= 1;
  }
  posts = posts.map((item) => (item.id === post.id ? post : item));
  return [200, post];
});

mock.onPost('/wall/posts/comments').reply((request) => {
  const {postId, comment} = JSON.parse(request.data);
  const post = posts.find((item) => item.id === postId);
  const newComment = {
    id: Math.floor(Math.random() * 10000),
    date: new Date().toString(),
    liked: false,
    ...comment,
  };
  post.comments = post.comments.concat(newComment);
  posts = posts.map((item) => (item.id === post.id ? post : item));
  return [200, post];
});
