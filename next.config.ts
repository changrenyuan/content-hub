import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Handle Node.js modules that shouldn't be bundled
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude Node.js built-in modules from client bundle
      config.externals = config.externals || [];
      config.externals.push(...[
        'child_process',
        'fs',
        'path',
        'os',
        'crypto',
        'stream',
        'util',
        'url',
        'querystring',
        'zlib',
        'http',
        'https',
        'net',
        'tls',
        'dns',
        'dgram',
        'readline',
        'repl',
        'cluster',
        'worker_threads',
        'vm',
        'v8',
        'inspector',
        'profiler',
        'async_hooks',
        'perf_hooks',
        'trace_events',
        'async_hooks',
        'worker_threads'
      ]);
    }
    return config;
  },
};

export default nextConfig;
