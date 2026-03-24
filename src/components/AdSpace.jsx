export default function AdSpace({ type, className = "", style = {} }) {
    const showAds = false;
    if (!showAds) return null;

    const styles = {
        top: "ad-region-top",
        bottom: "ad-region-bottom",
        side: "ad-region-side"
    }

    return (
        <div className={`${styles[type]} ${className}`} style={style}>
            <span className="ad-label">Advertisement</span>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', opacity: 0.5 }}>
                {type === 'top' && '730x92 Banner'}
                {type === 'bottom' && '730x92 Banner'}
                {type === 'side' && '162x602 Skyscraper'}
            </div>
        </div>
    )
}
