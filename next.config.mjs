/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['bcrypt'],
    middleware: true,
  },
  images: {
    domains: ['zaceflyqimwfxschnrpi.supabase.co', 'shopping-phinf.pstatic.net'],
  },
};

export default nextConfig;
