/**
 * formatBytes.ts
 * ---------------------------------------------------------------------------
 * Converts a raw byte count into a human-readable string.
 *
 * Examples:
 *   formatBytes(0)          → '0 Bytes'
 *   formatBytes(1024)       → '1 KB'
 *   formatBytes(1536)       → '1.50 KB'
 *   formatBytes(2097152)    → '2 MB'
 * ---------------------------------------------------------------------------
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
