export default (req, res) => {
  res.render("dashboard", {
    user: req.session.user,
    posts: [
      {
        id: 1,
        title: "I love express router",
        content: "Express is fun, isn't it?",
      },
    ],
  });
};
