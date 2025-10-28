// import { Heart, MessageCircle, Play, Share2, Star, Zap } from "lucide-react";

// const SideComponent = () => {
//   return (
//     <>
//       <div className="hidden lg:flex lg:w-full h-full items-center justify-center relative overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 opacity-20">
//           {/* Floating Social Media Icons */}
//           <div className="absolute top-16 left-16 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
//             <span className="text-2xl">📱</span>
//           </div>
//           <div className="absolute top-32 right-20 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
//             <span className="text-xl">📸</span>
//           </div>
//           <div className="absolute bottom-32 left-20 w-14 h-14 bg-white/20 rounded-full flex items-center justify-center animate-bounce delay-1000">
//             <span className="text-xl">🎥</span>
//           </div>
//           <div className="absolute bottom-16 right-16 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse delay-2000">
//             <span className="text-lg">🎵</span>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="relative z-10 flex flex-col justify-center px-12 py-8">
//           {/* Brand Header */}
//           <div className="mb-8">
//             <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
//               iShout
//             </h1>
//             <p className="text-xl text-white/90 font-light">
//               Connect with Top Social Media Influencers
//             </p>
//           </div>

//           {/* Platform Showcase */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-white mb-6">
//               Find Influencers Across All Platforms
//             </h2>

//             {/* Platform Cards */}
//             <div className="grid grid-cols-3 gap-4 mb-6">
//               {/* YouTube Card */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
//                     <Play className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="text-white font-semibold text-sm">YouTube</h3>
//                   <p className="text-white/70 text-xs">25K+ Creators</p>
//                 </div>
//               </div>

//               {/* Instagram Card */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
//                     <span className="text-white text-lg">📷</span>
//                   </div>
//                   <h3 className="text-white font-semibold text-sm">
//                     Instagram
//                   </h3>
//                   <p className="text-white/70 text-xs">40K+ Influencers</p>
//                 </div>
//               </div>

//               {/* TikTok Card */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
//                     <span className="text-white text-lg">🎵</span>
//                   </div>
//                   <h3 className="text-white font-semibold text-sm">TikTok</h3>
//                   <p className="text-white/70 text-xs">30K+ Creators</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Influencer Stats */}
//           <div className="mb-8">
//             <div className="grid grid-cols-2 gap-6">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-1">100K+</div>
//                 <div className="text-white/80 text-sm">Active Influencers</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white mb-1">$50M+</div>
//                 <div className="text-white/80 text-sm">Campaign Value</div>
//               </div>
//             </div>
//           </div>

//           {/* Mock Social Media Feed */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-white mb-4">
//               Trending Now
//             </h3>

//             {/* Instagram Post Mockup */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
//               <div className="flex items-center space-x-3 mb-3">
//                 <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
//                 <div>
//                   <div className="text-white font-semibold text-sm">
//                     @fashionista_emma
//                   </div>
//                   <div className="text-white/60 text-xs">2.3M followers</div>
//                 </div>
//                 <div className="ml-auto flex items-center space-x-2">
//                   <Heart className="w-4 h-4 text-white/60" />
//                   <MessageCircle className="w-4 h-4 text-white/60" />
//                   <Share2 className="w-4 h-4 text-white/60" />
//                 </div>
//               </div>
//               <div className="text-white/80 text-sm">
//                 ✨ New fashion collection is here! Check out my latest styling
//                 tips...
//               </div>
//             </div>

//             {/* YouTube Video Mockup */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
//               <div className="flex items-center space-x-3 mb-3">
//                 <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
//                   <Play className="w-4 h-4 text-white" />
//                 </div>
//                 <div>
//                   <div className="text-white font-semibold text-sm">
//                     @techreviewer_mike
//                   </div>
//                   <div className="text-white/60 text-xs">850K subscribers</div>
//                 </div>
//                 <div className="ml-auto flex items-center space-x-2">
//                   <Star className="w-4 h-4 text-white/60" />
//                   <span className="text-white/60 text-xs">4.8</span>
//                 </div>
//               </div>
//               <div className="text-white/80 text-sm">
//                 🔧 Latest iPhone 15 Pro review - Is it worth the upgrade?
//               </div>
//             </div>

//             {/* TikTok Video Mockup */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
//               <div className="flex items-center space-x-3 mb-3">
//                 <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm">🎵</span>
//                 </div>
//                 <div>
//                   <div className="text-white font-semibold text-sm">
//                     @dancequeen_sarah
//                   </div>
//                   <div className="text-white/60 text-xs">1.2M followers</div>
//                 </div>
//                 <div className="ml-auto flex items-center space-x-2">
//                   <Zap className="w-4 h-4 text-white/60" />
//                   <span className="text-white/60 text-xs">🔥</span>
//                 </div>
//               </div>
//               <div className="text-white/80 text-sm">
//                 💃 New dance trend alert! Try this viral move...
//               </div>
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
//             <div className="text-center">
//               <div className="text-white font-semibold mb-2">
//                 Ready to grow your brand?
//               </div>
//               <div className="text-white/80 text-sm">
//                 Join 10,000+ brands already using iShout
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default SideComponent;

import DomeGallery from "@/src/constant/Influencers-data";
export default function SideComponent() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DomeGallery />
    </div>
  );
}
