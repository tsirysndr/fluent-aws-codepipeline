import {
  Artifacts,
  Env,
  Phase,
  PhaseName,
  Reports,
  YamlSpec,
  Cache,
  EnvSchema,
  PhaseSchema,
  ReportsSchema,
  ArtifactsSchema,
  CacheSchema,
} from "./spec.ts";
import { stringify } from "https://esm.sh/v131/yaml@2.3.1";

class BuildSpec {
  private yaml: YamlSpec;

  constructor() {
    this.yaml = {
      version: 0.2,
      phases: {},
    };
  }

  env(params: Env): BuildSpec {
    EnvSchema.parse(params);
    this.yaml.env = params;
    return this;
  }

  phase(name: PhaseName, params: Phase): BuildSpec {
    PhaseSchema.parse(params);
    this.yaml.phases[name] = params;
    return this;
  }

  reports(params: Reports): BuildSpec {
    ReportsSchema.parse(params);
    this.yaml.reports = params;
    return this;
  }

  artifacts(params: Artifacts): BuildSpec {
    ArtifactsSchema.parse(params);
    this.yaml.artifacts = params;
    return this;
  }

  cache(params: Cache): BuildSpec {
    CacheSchema.parse(params);
    this.yaml.cache = params;
    return this;
  }

  toString() {
    return `# Do not edit this file directly. It is generated by https://deno.land/x/fluent_aws_codepipeline\n\n${stringify(
      this.yaml
    )}`;
  }

  save(path = "buildspec.yml") {
    const config = this.toString();
    Deno.writeTextFileSync(path, config);
  }
}

export default BuildSpec;
