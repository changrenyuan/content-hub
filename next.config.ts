import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config to disable it and use webpack
  turbopack: {},

  // Force use webpack instead of Turbopack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude Node.js built-in modules from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        querystring: false,
        zlib: false,
        http: false,
        https: false,
        net: false,
        tls: false,
        dns: false,
        dgram: false,
        readline: false,
        repl: false,
        cluster: false,
        worker_threads: false,
        vm: false,
        v8: false,
        inspector: false,
        profiler: false,
        async_hooks: false,
        perf_hooks: false,
        trace_events: false,
      };
    }
    return config;
  },
  // Set a placeholder DATABASE_URL for build time
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/contenthub',
  },
};

export default nextConfig;
