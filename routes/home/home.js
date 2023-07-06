import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (req, res) =>
  res.sendFile(join(__dirname, "../../" + "public", "client", "index.html"));
