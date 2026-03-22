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
                {type === 'top' && '970x90 Banner'}
                {type === 'bottom' && '970x250 Large Banner'}
                {type === 'side' && '160x600 Skyscraper'}
            </div>
        </div>
    )
}
