import { z } from "../deps.ts";

export const EnvSchema = z
  .object({
    shell: z.string().optional(),
    variables: z.record(z.string()).optional(),
    "parameter-store": z.record(z.string()).optional(),
    "exported-variables": z.array(z.string()).optional(),
    "secrets-manager": z.record(z.string()).optional(),
    "git-credential-helper": z.enum(["yes", "no"]).optional(),
  })
  .optional();

export const PhaseSchema = z
  .object({
    "run-as": z.string().optional(),
    "on-failure": z.enum(["ABORT", "CONTINUE"]).optional(),
    "runtime-versions": z.record(z.string()).optional(),
    commands: z.array(z.string()).optional(),
    finally: z.array(z.string()).optional(),
  })
  .optional();

export const ReportsSchema = z
  .object({
    files: z.array(z.string()),
    "base-directory": z.string().optional(),
    "discard-paths": z.enum(["yes", "no"]).optional(),
    "file-format": z.string().optional(),
  })
  .optional();

export const ArtifactsSchema = z
  .object({
    files: z.array(z.string()),
    name: z.string().optional(),
    "discard-paths": z.enum(["yes", "no"]).optional(),
    "base-directory": z.string().optional(),
    "exclude-paths": z.array(z.string()).optional(),
    "enable-symlinks": z.enum(["yes", "no"]).optional(),
    "s3-prefix": z.string().optional(),
    "secondary-artifacts": z
      .record(
        z.object({
          files: z.array(z.string()),
          name: z.string().optional(),
          "discard-paths": z.enum(["yes", "no"]).optional(),
          "base-directory": z.string().optional(),
          "exclude-paths": z.array(z.string()).optional(),
          "enable-symlinks": z.enum(["yes", "no"]).optional(),
          "s3-prefix": z.string().optional(),
        })
      )
      .optional(),
  })
  .optional();

export const CacheSchema = z
  .object({
    paths: z.array(z.string()),
  })
  .optional();

export const Schema = z.object({
  version: z.number().optional(),
  "run-as": z.string().optional(),
  env: EnvSchema,
  phases: z.object({
    install: PhaseSchema,
    pre_build: PhaseSchema,
    build: PhaseSchema,
    post_build: PhaseSchema,
  }),
  reports: ReportsSchema,
  artifacts: ArtifactsSchema,
  cache: CacheSchema,
});

export type PhaseName = keyof z.infer<typeof Schema>["phases"];

export type Phase = z.infer<typeof PhaseSchema>;

export type Env = z.infer<typeof EnvSchema>;

export type Reports = z.infer<typeof ReportsSchema>;

export type Artifacts = z.infer<typeof ArtifactsSchema>;

export type Cache = z.infer<typeof CacheSchema>;

export type YamlSpec = z.infer<typeof Schema>;
