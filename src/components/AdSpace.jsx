export default function AdSpace({ type, className = "", style = {} }) {
    const showAds = false;
    
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

    return (
        <div 
            className={`${styles[type]} ${className}`} 
            style={{ 
                minHeight: heights[type],
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.02)',
                borderRadius: '12px',
                marginBottom: type === 'top' ? '2rem' : '0',
                ...style 
            }}
        >
            <span className="ad-label" style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em' }}>Advertisement</span>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', opacity: 0.5 }}>
                {type === 'top' && '730x92 Banner'}
                {type === 'bottom' && '730x92 Banner'}
                {type === 'side' && '162x602 Skyscraper'}
            </div>
        </div>
    )
}
