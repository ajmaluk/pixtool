import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-1506704627672992';
const AD_SLOTS = {
    top: '8821351882',
    bottom: '8821351882',
    side: '6362709508'
};

export default function AdSpace({ type, className = '', style = {} }) {
    const showAds = true;
    const adRef = useRef(null);

    useEffect(() => {
        if (!showAds || !adRef.current || !AD_SLOTS[type]) return;

        // Avoid duplicate pushes when React re-renders or in StrictMode dev re-mounts.
        if (adRef.current.getAttribute('data-adsbygoogle-status')) return;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (_error) {
            // Ignore push errors and allow AdSense script to retry on next mount.
        }
    }, [type, showAds]);

    if (!showAds || !AD_SLOTS[type]) return null;

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

    const adMargins = {
        top: '2.5rem auto',
        bottom: '2.5rem auto',
        side: '2.5rem 0'
    };

    return (
        <div
            className={`${styles[type]} ${className}`}
            style={{
                minHeight: heights[type],
                width: '100%',
                maxWidth: type === 'side' ? '160px' : '100%',
                margin: type === 'side' ? '1.5rem auto' : '0 auto',
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '12px',
                ...style
            }}
        >
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ 
                    display: 'block',
                    width: type === 'side' ? '160px' : '100%',
                    height: type === 'side' ? '600px' : '90px' 
                }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={AD_SLOTS[type]}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
