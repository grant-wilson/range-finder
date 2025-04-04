import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: [
    { name: ".", path: "./src/index.ts" },
  ],
  outDir: "./npm",
  shims: {},
  importMap: "./deno.json",
  test: false,
  // typeCheck: "both",
  package: {
    name: "@triangulum/range-finder",
    version: "1.0.0-alpha.1",
    description: "Find ranges of text within a node.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/grant-wilson/range-finder.git",
    },
    bugs: {
      url: "https://github.com/grant-wilson/range-finder/issues",
    },
  },
});
