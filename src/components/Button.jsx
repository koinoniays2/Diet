export default function Button({ color, text }) {
    return (
        <button className={`${color} btn-custom`}>
            <div className="btn-border-custom">
                {text}
            </div>
        </button>
    )
}
