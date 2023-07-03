export default (req, res) => {
  const { email, password } = req.body;
  if (email === "a@b.com" && password === "a") {
    req.session.user = "Test User";
    return res.redirect("/admin/dashboard");
  }

  res.redirect("/admin/login");
};
