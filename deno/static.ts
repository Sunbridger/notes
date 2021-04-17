import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// Send static content
app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}`,
    // index: "index.html",
  });
});

await app.listen({ hostname: "127.0.0.1", port: 8000 });