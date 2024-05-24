import { app } from "./app";
import { swaggerDocs as v1SwaggerDocs } from "./v1/routes/swagger";

const PORT = process.env.NODE_DOCKER_PORT || "3000";
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  v1SwaggerDocs(app, PORT);
});
