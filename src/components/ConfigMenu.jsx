export default function ConfigMenu({ color, colorName, onClick }) {
    return (
        <li className="py-2 px-1 flex items-center gap-1 hover:border-custom-2"
        onClick={onClick}>
            <p className={`w-6 h-6 rounded-full ${color}`}></p>
            <span>{colorName}</span>
        </li>
    )
}
