type NameToType = {
  readonly ENV: 'production' | 'staging' | 'development' | 'test';
  readonly NODE_ENV: 'production' | 'development';
  readonly NEXTAUTH_URL: string;
  readonly DATABASE_URL: string;
  readonly GITHUB_SECRET: string;
  readonly GITHUB_ID: string;
};

export function getEnv<Env extends keyof NameToType>(
  name: Env,
): NameToType[Env];
export function getEnv(name: keyof NameToType): NameToType[keyof NameToType] {
  const val = process.env[name];

  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }

  return val;
}
