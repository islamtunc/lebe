//Bîsmîllahîrrahmanîrahîm
//Elhamdulîllahîrabbulalemîn
//Es selatu vesselamu ala rasulîna Muhammedin ve ala alihi ve sahbihi ecmaîn
//SuphanAllahî velhamdulîllahî ve la ilahe illallah û vallahu ekber
//LA ILAHE ILLALLAH MUHAMMEDEN RESULULLAH
//Allahümme salli ala seyyidina Muhammedin ve ala alihi ve sahbihi ecmaîn
//LA ILAHE ILLALLAHU VAHDEHU LA ŞERİKE LEHU, LEHÜL MÜLKÜ VE LEHÜL HAMDÜ YUHYİ VE YUMİTÜ VE HÜVE ALA KULLİ ŞEYİN KADİR
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },
    ],
  },
  rewrites: () => {
    return [
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ];
  },
};

export default nextConfig;
