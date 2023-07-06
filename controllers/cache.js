// import redisClient from "../cache/index.js";

// export const cacheContent = (key, content, expiry = 120) =>
//   redisClient.setEx(key, expiry, JSON.stringify(content));

// export const deleteCache = (key) => {
//   if (Array.isArray(key)) {
//     return key.forEach((k) => redisClient.del(k));
//   }

//   return redisClient.del(key);
// };

// export const servePostsFromCache = () => (req, res, next) =>
//   redisClient
//     .get("all-posts")
//     .then((reply) => {
//       if (!reply) return next();
//       res.json({ posts: JSON.parse(reply) });
//     })
//     .catch((error) => {
//       console.error(error);
//       next();
//     });

// export const servePostFromCache = () => (req, res, next) =>
//   redisClient.get(`post:${req.params.postId}`, (error, reply) => {
//     if (error || !reply) return next();

//     res.json({ post: JSON.parse(reply) });
//   });
