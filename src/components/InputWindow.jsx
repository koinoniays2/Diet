export default function InputWindow({ children }) {
    return (
        <section className="w-full h-screen p-4 flex justify-center items-center">
            <div className="w-full max-w-80 min-w-80 border-black border rounded-xl
            shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]">
                <div className="p-1 border-black rounded-t-xl border-b bg-color-hotpink">
                    Diet
                </div>
                <div className="w-full p-5">
                    <form className="flex flex-col gap-12">
                        { children }
                    </form>
                </div>
            </div>
        </section>
    )
}
