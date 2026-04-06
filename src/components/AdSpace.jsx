export default function AdSpace({ type, className = "", style = {} }) {
    const showAds = true;
    
    // Define heights for CLS mitigation
    const heights = {
        top: '90px',
        bottom: '90px',
        side: '600px'
    };

    if (!showAds) return null;

    const styles = {
        top: "ad-region-top",
        bottom: "ad-region-bottom",
        side: "ad-region-side"
    }

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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px dashed var(--border-color)',
                margin: adMargins[type] || '2rem auto',
                padding: '2rem',
                ...style 
            }}
        >
            <span className="ad-label" style={{ 
                fontSize: '0.7rem', 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                opacity: 0.82, 
                letterSpacing: '0.2em',
                marginBottom: '1rem',
                color: 'var(--text-secondary)'
            }}>
                ADVERTISEMENT
            </span>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.82 }}>
                {type === 'top' && '730x92 Banner'}
                {type === 'bottom' && '730x92 Banner'}
                {type === 'side' && '162x602 Skyscraper'}
            </div>
        </div>
    )
}
