import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./libs/routesExporter.js";
import connectToMongo from "./utils/db.js"; // for URL-encoded data
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
dotenv.config();
connectToMongo();

app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/routes/blogs", routes.blogRoute);
app.use("/routes/users", routes.userRoute);
app.use("/routes/msg", routes.msgRoute);

app.listen(port, () => {
  console.log(`Server listening on  http://localhost:${port}`);
});
