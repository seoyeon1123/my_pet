/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['bcrypt'],
    middleware: true,
  },
  images: {
    domains: ['zaceflyqimwfxschnrpi.supabase.co'],
  },
};

export default nextConfig;
