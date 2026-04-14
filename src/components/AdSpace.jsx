import React from 'react';

const AD_UNITS = {
    top: {
        key: '69939246f506d825ab4aa777d70c3682',
        format: 'iframe',
        height: 90,
        width: 728
    },
    bottom: {
        key: '69939246f506d825ab4aa777d70c3682',
        format: 'iframe',
        height: 90,
        width: 728
    },
    side: {
        key: 'df591a46761792396f28a3f280662634',
        format: 'iframe',
        height: 600,
        width: 160
    }
};

export default function AdSpace({ type, className = '', style = {} }) {
    const showAds = true;
    
    if (!showAds || !AD_UNITS[type]) return null;

    const config = AD_UNITS[type];

    const heights = {
        top: '90px',
        bottom: '90px',
        side: '600px'
    };

    const styles = {
        top: 'ad-region-top',
        bottom: 'ad-region-bottom',
        side: 'ad-region-side'
    };

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

    return (
        <div
            key={`${type}-${config.key}`}
            className={`${styles[type]} ${className}`}
            style={{
                minHeight: heights[type],
                width: type === 'side' ? '160px' : '100%',
                maxWidth: type === 'side' ? '160px' : '728px',
                margin: type === 'side' ? '0 auto' : (type === 'top' ? '0 auto 2rem' : '3rem auto 2rem'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                background: 'rgba(148, 163, 184, 0.05)',
                border: '1px solid var(--border-color)',
                position: 'relative',
                flexShrink: 0,
                ...style
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
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
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
