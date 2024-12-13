export default function Button({ type, color, text, onClick, disable }) {
    return (
        <button disabled={disable} type={type} className={`${color} btn-custom`} {...(onClick && { onClick })}>
            {/* onClick이 있으면 { onClick: onClick } 객체 생성
            ...으로 객체의 키-값을 JSX 태그의 속성으로 변환(Reart JSX 고유 기능) */}
            <div className="h-full w-full border-custom-1 flex justify-center items-center">
                {text}
            </div>
        </button>
    )
}
