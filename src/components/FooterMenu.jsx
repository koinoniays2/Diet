export default function FooterMenu({ divCSS, src, alt, imgCSS, span, onClick }) {
    const ICON_CONTAINER = `flex-1 flex flex-col items-center justify-center py-2 cursor-pointer`;

    return (
        <div className={`${ICON_CONTAINER} ${divCSS}`} onClick={onClick}>
            <img src={src} alt={alt} className={imgCSS} />    
            <span>{span}</span>
        </div>
    )
}
