export type PhaseName = "install" | "pre_build" | "build" | "post_build";

export type Phase = {
  "run-as"?: string;
  "on-failure"?: "ABORT" | "CONTINUE";
  "runtime-versions"?: { [key: string]: string };
  commands?: string[];
  finally?: string[];
};

export type Env = {
  shell?: string;
  variables?: { [key: string]: string };
  "parameter-store"?: { [key: string]: string };
  "exported-variables"?: string[];
  "secrets-manager"?: { [key: string]: string };
  "git-credential-helper"?: "yes" | "no";
};

export type Reports = {
  files: string[];
  "base-directory"?: string;
  "discard-paths"?: "yes" | "no";
  "file-format"?: string;
};

export type Artifacts = {
  files: string[];
  name?: string;
  "discard-paths"?: "yes" | "no";
  "base-directory"?: string;
  "exclude-paths"?: string[];
  "enable-symlinks"?: "yes" | "no";
  "s3-prefix"?: string;
  "secondary-artifacts"?: {
    [key: string]: {
      files: string[];
      name?: string;
      "discard-paths"?: "yes" | "no";
      "base-directory"?: string;
      "exclude-paths"?: string[];
      "enable-symlinks"?: "yes" | "no";
      "s3-prefix"?: string;
    };
  };
};

export type Cache = {
  paths: string[];
};

export type YamlSpec = {
  version: 0.1 | 0.2;
  "run-as"?: string;
  env?: Env;
  phases: {
    install?: Phase;
    pre_build?: Phase;
    build?: Phase;
    post_build?: Phase;
  };
  reports?: Reports;
  artifacts?: Artifacts;
  cache?: Cache;
};
