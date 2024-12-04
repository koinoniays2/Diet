import ConfigMenu from "./ConfigMenu";
import Red from "../assets/close_folder_red.svg";
import Orange from "../assets/close_folder_orange.svg";
import Yellow from "../assets/close_folder_yellow.svg";
import Green from "../assets/close_folder_green.svg";
import Blue from "../assets/close_folder_blue.svg";
import Purple from "../assets/close_folder_purple.svg";
import Black from "../assets/close_folder_gray.svg";
import Cookies from "js-cookie";


export default function FooterMenu({ index, activeMenu,
    divCSS, src, alt, imgCSS, span, onClick,
    setBaseColor, setFolderIconColor }) {
    const ICON_CONTAINER = `flex-1 flex flex-col items-center justify-center py-2 cursor-pointer`;

    // 컬러 설정
    const menus = [
        {
            color: [
                { color: "bg-[#FFA7A7]", colorName: "Red", setFolderIconColor: Red, setBaseColor: "bg-color-red" },
                { color: "bg-[#FFC19E]", colorName: "Orange", setFolderIconColor: Orange, setBaseColor: "bg-color-orange" },
                { color: "bg-[#F2CB61]", colorName: "Yellow", setFolderIconColor: Yellow, setBaseColor: "bg-color-yellow" },
                { color: "bg-[#86E57F]", colorName: "Green", setFolderIconColor: Green, setBaseColor: "bg-color-green" },
                { color: "bg-[#6799FF]", colorName: "Blue", setFolderIconColor: Blue, setBaseColor: "bg-color-blue" },
                { color: "bg-[#A566FF]", colorName: "Purple", setFolderIconColor: Purple, setBaseColor: "bg-color-purple" },
                { color: "bg-[#5D5D5D]", colorName: "Black", setFolderIconColor: Black, setBaseColor: "bg-color-black" }
            ]
        }
    ]

    const ConfigMenuClick = (index) => {
        menus.map((item) => {
            item.color.map((color, colorIndex) => {
                if(index === colorIndex) {
                    setBaseColor(color.setBaseColor); // 배경색
                    setFolderIconColor(color.setFolderIconColor); // 폴더색

                    // 쿠키에 저장 js-cookie
                    Cookies.set("baseColor", color.setBaseColor);
                    Cookies.set("folderIconColor", color.setFolderIconColor);

                }
            })
        });
    };
    return (
        <li className={`${ICON_CONTAINER} ${divCSS} relative`} onClick={onClick}>
            {/* 환경설정 클릭 시 나오는 메뉴 / index가 2인 FooterMenu 메뉴에만 렌더링*/}
            {index === 2 && activeMenu === index && (
                <ul className="absolute bottom-full right-0 w-full border-custom-1 px-1 z-10">
                    {   // 메뉴 추가
                        menus.map((item) => (
                            item.color.map((menu, index) => (
                                <ConfigMenu key={index} index={index}
                                    color={menu.color} colorName={`${menu.colorName}`}
                                    setBaseColor={setBaseColor} setFolderIconColor={setFolderIconColor}
                                    onClick={() => ConfigMenuClick(index)} />
                            ))
                        ))
                    }
                </ul>
            )}
            <img src={src} alt={alt} className={imgCSS} />
            <span>{span}</span>
        </li>
    )
}
