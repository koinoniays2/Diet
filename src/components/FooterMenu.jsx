import ConfigMenu from "./ConfigMenu";
import Cookies from "js-cookie";
import { getBaseColor, getFolderColor } from "../lib/SettingColor";


export default function FooterMenu({ index, activeMenu,
    divCSS, src, alt, imgCSS, span, 
    onClick,
    setBaseColor, setFolderIconColor }) {
    const ICON_CONTAINER = `flex-1 flex flex-col items-center justify-center py-2 cursor-pointer`;

    // 설정 메뉴 데이터
    const menus = [
        {
            color: [
                { color: "bg-[#FFA7A7]", colorName: "Red" },
                { color: "bg-[#FFC19E]", colorName: "Orange" },
                { color: "bg-[#F2CB61]", colorName: "Yellow" },
                { color: "bg-[#86E57F]", colorName: "Green" },
                { color: "bg-[#6799FF]", colorName: "Blue" },
                { color: "bg-[#A566FF]", colorName: "Purple" },
                { color: "bg-[#5D5D5D]", colorName: "Black" }
            ]
        }
    ]

    // 쿠키 저장
    const ConfigMenuClick = (index) => {
        menus.map((item) => {
            item.color.map((_, menuIndex) => {
                if(index === menuIndex) {
                    setBaseColor(getBaseColor(index)); // 배경색
                    setFolderIconColor(getFolderColor(index)); // 폴더색

                    // 변경 컬러 인덱스 쿠키에 저장 js-cookie
                    Cookies.set("BaseIndex", index);

                }
            })
        });
    };
    return (
        <li className={`${ICON_CONTAINER} ${divCSS} relative`} onClick={onClick}>
            {/* 환경설정 클릭 시 나오는 메뉴 / index가 2인 FooterMenu 메뉴에서만 렌더링*/}
            {index === 2 && activeMenu === index && (
                <ul className="absolute bottom-full right-0 w-full border-custom-1 px-1 z-10">
                    {   // 메뉴 추가
                        menus.map((item) => (
                            item.color.map((menu, index) => (
                                <ConfigMenu key={index}
                                    color={menu.color} colorName={`${menu.colorName}`} // 설정 메뉴 데이터
                                    onClick={() => ConfigMenuClick(index)} /> // 클릭 시 메뉴 인덱스 전달
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
