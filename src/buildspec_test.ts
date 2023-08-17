import { assertEquals } from "https://deno.land/std@0.191.0/testing/asserts.ts";
import BuildSpec from "./buildspec.ts";

Deno.test(function buildspecTest() {
  const yaml = Deno.readTextFileSync("./fixtures/buildspec.yml");

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

  assertEquals(buildspec.toString(), yaml);
});
