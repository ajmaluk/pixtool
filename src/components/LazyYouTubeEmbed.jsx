import { useMemo, useState } from 'react'

export default function LazyYouTubeEmbed({
  videoId,
  title,
  className,
  style,
  rounded = '24px'
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  const thumbnail = useMemo(
    () => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    [videoId]
  )

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: rounded,
        overflow: 'hidden',
        ...style
      }}
    >
      {isLoaded ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          aria-label={`Play video: ${title}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            padding: 0,
            border: 'none',
            cursor: 'pointer',
            background: '#000'
          }}
        >
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            decoding="async"
            width="1280"
            height="720"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
          />
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '68px',
              height: '48px',
              transform: 'translate(-50%, -50%)',
              borderRadius: '14px',
              background: 'rgba(0, 0, 0, 0.72)',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '16px solid #fff',
                marginLeft: '4px'
              }}
            />
          </span>
        </button>
      )}
    </div>
  )
}
