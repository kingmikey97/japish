// components/EmbedVideo.jsx
const EmbedVideo = ({ url }) => {
  const getEmbedInfo = (url) => {
    if (url.includes('tiktok.com')) {
      const match = url.match(/\/video\/(\d+)/);
      if (match) {
        return {
          embedUrl: `https://www.tiktok.com/embed/${match[1]}`,
          aspect: 'aspect-[9/16]',
        };
      }
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId;
      if (url.includes('youtu.be')) {
        videoId = url.split('/').pop();
      } else {
        const match = url.match(/[?&]v=([^&]+)/);
        videoId = match ? match[1] : null;
      }
      if (videoId) {
        return {
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          aspect: 'aspect-video',
        };
      }
    }
    if (url.includes('vimeo.com')) {
      const match = url.match(/\/(\d+)/);
      if (match) {
        return {
          embedUrl: `https://player.vimeo.com/video/${match[1]}`,
          aspect: 'aspect-video',
        };
      }
    }
    return null;
  };

  const info = getEmbedInfo(url);
  if (!info) {
    return (
      <div className="w-full bg-gray-800 rounded-lg flex items-center justify-center p-8">
        <p className="text-gray-400 text-sm">Video no soportado</p>
      </div>
    );
  }

  return (
    <div className={`relative ${info.aspect} w-full rounded-lg overflow-hidden bg-black`}>
      <iframe
        src={info.embedUrl}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="encrypted-media; autoplay; fullscreen"
        allowFullScreen
        title="Video embed"
      />
    </div>
  );
};

export default EmbedVideo;