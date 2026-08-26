import React, { useRef, useState, useEffect } from 'react';

const HORIZONTAL_AD = {
    key: '69939246f506d825ab4aa777d70c3682',
    format: 'iframe',
    height: 90,
    width: 728
};

const SIDE_AD = {
    key: 'df591a46761792396f28a3f280662634',
    format: 'iframe',
    height: 600,
    width: 160
};

const AD_UNITS = {
    top: HORIZONTAL_AD,
    bottom: HORIZONTAL_AD,
    horizontal: HORIZONTAL_AD,
    banner: HORIZONTAL_AD,
    side: SIDE_AD,
    sidebar: SIDE_AD
};

export default function AdSpace({ type, className = '', style = {} }) {
    const showAds = true;
    const config = AD_UNITS[type];
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);
    
    const isSide = type === 'side' || type === 'sidebar';

    useEffect(() => {
        if (isSide || !containerRef.current || !config?.width) return;

        const updateScale = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.clientWidth;
            if (containerWidth > 0 && containerWidth < config.width) {
                setScale(containerWidth / config.width);
            } else {
                setScale(1);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, [isSide, config?.width]);

    if (!showAds || !config) return null;

    // Construct the HTML for the iframe isolation
    // This gives the Adsterra script its own window object to prevent atOptions collisions
    const iframeSrcDoc = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    body { margin: 0; padding: 0; overflow: hidden; display: flex; justify-content: center; align-items: center; height: 100vh; }
                </style>
            </head>
            <body>
                <script type="text/javascript">
                    atOptions = {
                        'key' : '${config.key}',
                        'format' : '${config.format}',
                        'height' : ${config.height},
                        'width' : ${config.width},
                        'params' : {}
                    };
                </script>
                <script type="text/javascript" src="https://controlslaverystuffing.com/${config.key}/invoke.js"></script>
            </body>
        </html>
    `;

    const renderedHeight = isSide ? config.height : Math.round(config.height * scale);

    return (
        <div
            ref={containerRef}
            key={`${type}-${config.key}`}
            className={`ad-region-${type} ${className}`}
            style={{
                minHeight: `${renderedHeight}px`,
                height: `${renderedHeight}px`,
                width: isSide ? '160px' : '100%',
                maxWidth: isSide ? '160px' : '100%',
                margin: isSide ? '0 auto' : (type === 'top' ? '0 auto 1.5rem' : '2rem auto'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                background: 'rgba(148, 163, 184, 0.05)',
                border: '1px solid var(--border-color)',
                position: 'relative',
                flexShrink: 0,
                boxSizing: 'border-box',
                ...style
            }}
        >
            <div
                style={{
                    width: `${config.width}px`,
                    height: `${config.height}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: scale < 1 ? `scale(${scale})` : 'none',
                    transformOrigin: 'center center',
                    flexShrink: 0
                }}
            >
                <iframe
                    title={`Ad-${type}`}
                    srcDoc={iframeSrcDoc}
                    width={config.width}
                    height={config.height}
                    style={{
                        border: 'none',
                        overflow: 'hidden',
                        display: 'block'
                    }}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                />
            </div>
            <div className="ad-label" style={{
                position: 'absolute',
                top: '4px',
                right: '8px',
                fontSize: '9px',
                opacity: 0.4,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                pointerEvents: 'none',
                zIndex: 1
            }}>AD</div>
        </div>
    );
}
