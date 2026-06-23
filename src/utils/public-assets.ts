import { existsSync } from "node:fs";
import path from "node:path";

export function publicAssetExists(publicPath: string) {
  const normalizedPath = publicPath.replace(/^\/+/, "");

  return existsSync(path.join(process.cwd(), "public", normalizedPath));
}
