# Fluent AWS CodePipeline

[![deno module](https://shield.deno.dev/x/fluent_aws_codepipeline)](https://deno.land/x/fluent_aws_codepipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/tsirysndr/fluent-aws-codepipeline)](https://codecov.io/gh/tsirysndr/fluent-aws-codepipeline)

Fluent AWS CodePipeline is a deno module for generating AWS CodePipeline configuration (`buildspec.yml`) files easily and fluently.

## 🚀 Usage

```typescript
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

buildspec.save("buildspec.yml");

```