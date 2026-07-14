import { createApp } from "./app.js";

const DEFAULT_PORT = 3333;
const port = process.env.PORT ? Number(process.env.PORT) : DEFAULT_PORT;

const app = createApp();

app.listen(port, () => {
  console.log(`Weather monitor backend listening on port ${port}`);
});
