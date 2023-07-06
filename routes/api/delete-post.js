import { deletePost } from "../../controllers/post.js";
// import { deleteCache } from "../../controllers/cache.js";

export default async (req, res) => {
  try {
    const id = req.params.postId;
    await deletePost(id);
    // deleteCache([`post:${id}`, "all-posts"]);
    res.json({ status: true });
  } catch (error) {
    res.status(401).json({ error });
  }
};
