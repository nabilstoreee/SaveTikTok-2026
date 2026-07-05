import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Download, ChevronLeft, Music, Copy, Share2, Play, Pause } from 'lucide-react';
import { VideoResultData } from '../types';
import { fetchYouTubeAudio } from '../lib/api';

interface VideoResultProps {
  data: VideoResultData;
  onBack: () => void;
  settings?: any;
}

export function VideoResult({ data, onBack, settings }: VideoResultProps) {
  const [downloadingAudio, setDownloadingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTogglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!video.paused) {
      video.pause();
    } else {
      try {
        await video.play();
      } catch (error) {
        console.error("Play error:", error);
      }
    }
  };

  const handleDownloadYoutubeAudio = async () => {
    try {
      setDownloadingAudio(true);
      const url = await fetchYouTubeAudio(data.playUrl);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audio_youtube.mp3`;
      link.click();
    } catch (e) {
      alert("Gagal mengunduh audio.");
    } finally {
      setDownloadingAudio(false);
    }
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(data.title);
    alert('Caption disalin!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: data.title, url: data.playUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(data.playUrl);
      alert('Link disalin!');
    }
  };


  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-all group font-bold text-sm"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali</span>
        </button>
        <div className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-lg">
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            {settings?.videoBadgeText || data.platform} {data.quality ? ` • ${data.quality}` : ''}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg">
        {data.images && data.images.length > 0 ? (
          <div className="relative bg-slate-100 dark:bg-[#0b0f19] p-4 flex gap-4 overflow-x-auto snap-x scrollbar-none">
            {data.images.map((imgUrl, i) => (
              <div key={i} className="snap-center shrink-0 w-[80%] max-w-[300px] aspect-[3/4] relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <img src={imgUrl} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
                <a 
                  href={imgUrl} 
                  download={`image_${i+1}.jpg`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 bg-white/90 text-slate-900 p-2 rounded-xl shadow-lg hover:bg-white hover:scale-105 transition-all"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative aspect-video bg-slate-100 dark:bg-[#0b0f19] cursor-pointer" onClick={handleTogglePlay}>
            <video 
              ref={videoRef}
              src={data.playUrl || undefined} 
              poster={data.cover || undefined} 
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              playsInline
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                <div className="w-16 h-16 bg-white/90 dark:bg-slate-900/90 rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="w-8 h-8 text-indigo-600 dark:text-indigo-400 ml-1" fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          <h3 className="text-slate-900 dark:text-slate-100 font-bold text-lg leading-snug mb-2 line-clamp-2">
            {data.title}
          </h3>
          {data.author && data.author !== 'unknown' && (
            <div className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6 tracking-wide">@{data.author}</div>
          )}

          {data.stats && (
            <div className="grid grid-cols-3 gap-4 mb-6 border-y border-slate-200 dark:border-slate-800/60 py-4">
              <div className="text-center">
                <div className="text-indigo-600 dark:text-indigo-400 text-[10px] uppercase tracking-widest font-bold mb-1">Likes</div>
                <div className="text-slate-900 dark:text-slate-100 font-bold text-lg">{data.stats.likes?.toLocaleString() || '0'}</div>
              </div>
              <div className="text-center">
                <div className="text-indigo-600 dark:text-indigo-400 text-[10px] uppercase tracking-widest font-bold mb-1">Shares</div>
                <div className="text-slate-900 dark:text-slate-100 font-bold text-lg">{data.stats.shares?.toLocaleString() || '0'}</div>
              </div>
              <div className="text-center">
                <div className="text-indigo-600 dark:text-indigo-400 text-[10px] uppercase tracking-widest font-bold mb-1">Views</div>
                <div className="text-slate-900 dark:text-slate-100 font-bold text-lg">{data.stats.views?.toLocaleString() || '0'}</div>
              </div>
            </div>
          )}


          <div className="space-y-4">
            {data.platform === 'tiktok' && (
              <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-none">
                <button 
                  onClick={handleCopyCaption}
                  className="flex-1 min-w-[120px] bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" /> Copy Caption
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 min-w-[120px] bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" /> Bagikan
                </button>
              </div>
            )}
            {!(data.images && data.images.length > 0) && (
              <motion.a
                href={data.playUrl}
                download
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="block w-full bg-slate-900 text-white dark:bg-white dark:text-black font-bold text-sm py-3.5 rounded-full text-center flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <Download className="w-4 h-4" />
                Download Video HD {data.platform === 'tiktok' ? '(No Watermark)' : ''}
              </motion.a>
            )}

            {data.musicUrl && data.platform === 'tiktok' && (
              <a 
                href={data.musicUrl} 
                download 
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 font-semibold text-sm py-3.5 rounded-full text-center transition-all flex items-center justify-center gap-2"
              >
                <Music className="w-4 h-4" /> Download Audio (MP3)
              </a>
            )}

            {data.platform === 'youtube' && (
              <button 
                onClick={handleDownloadYoutubeAudio}
                disabled={downloadingAudio}
                className="w-full bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 font-semibold text-sm py-3.5 rounded-full text-center transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Music className="w-4 h-4" /> 
                {downloadingAudio ? 'Memproses Audio...' : 'Download Audio (MP3)'}
              </button>
            )}

            {data.watermarkUrl && data.platform === 'tiktok' && !(data.images && data.images.length > 0) && (
              <a 
                href={data.watermarkUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm py-3.5 rounded-full text-center transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Download className="w-4 h-4" /> Download dengan Watermark
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
