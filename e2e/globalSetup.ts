import { execSync } from "child_process";

export default async function globalSetup() {
    execSync('sh ./scripts/setup-e2e-test.sh', { stdio: 'inherit' })
};