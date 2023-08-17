import { BuildSpec } from "https://deno.land/x/fluent_aws_codepipeline@v0.1.0/mod.ts";

const buildspec = new BuildSpec();

buildspec
  .phase("install", {
    "runtime-versions": {
      golang: "1.13",
    },
  })
  .phase("build", {
    commands: [
      "echo Build started on `date`",
      "echo Compiling the Go code",
      "go build hello.go",
    ],
  })
  .phase("post_build", {
    commands: ["echo Build completed on `date`"],
  })
  .artifacts({
    files: ["hello"],
  });

console.log(buildspec.toString());
