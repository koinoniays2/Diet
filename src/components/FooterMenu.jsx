import ConfigMenu from "./ConfigMenu";
import Cookies from "js-cookie";
import { getBaseColor, getFolderColor, getOpenFolderColor } from "../lib/SettingColor";
import { AnimatePresence, motion } from "framer-motion";


export default function FooterMenu({ index, activeMenu,
    divCSS, src, alt, imgCSS, span, 
    onClick,
    setBaseColor, setFolderIconColor, setOpenFolderIconColor,
    baseColor }) {
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
        menus.forEach((item) => {
            item.color.forEach((_, menuIndex) => {
                if(index === menuIndex) {
                    setBaseColor(getBaseColor(index)); // 배경색
                    setFolderIconColor(getFolderColor(index)); // 폴더색
                    setOpenFolderIconColor(getOpenFolderColor(index)) // 열린 폴더

                    // 변경 컬러 인덱스 쿠키에 저장 js-cookie
                    Cookies.set("BaseIndex", index);

                }
            })
        });
    };
    return (
        // 전체 메뉴
        <li className={`${ICON_CONTAINER} ${divCSS} relative ${baseColor}`} onClick={onClick}>
            {/* 환경설정 클릭 시 나오는 메뉴 / index가 2인 FooterMenu 메뉴에서만 렌더링*/}
            <AnimatePresence>
            {index === 2 && activeMenu === index && (
                <motion.ul 
                initial={{ y: 70, opacity: 1 }}      // 시작 상태: 아래에서 위로 슬라이드
                animate={{ y: 0, opacity: 1 }}       // 보여질 때: 위로 슬라이드, 불투명도 증가
                exit={{ y: 80, opacity: 0 }}         // 사라질 때: 아래로 슬라이드
                transition={{ duration: 0.5 }}       // 애니메이션 지속 시간
                className={`absolute bottom-full right-0 w-full border-custom-1 px-1 -z-10 ${baseColor}`}
                onClick={(e) => e.stopPropagation()}>
                    {   // 메뉴 추가
                        menus.map((item) => (
                            item.color.map((menu, index) => (
                                <ConfigMenu key={index}
                                    color={menu.color} colorName={`${menu.colorName}`} // 설정 메뉴 데이터
                                    onClick={() => ConfigMenuClick(index)} /> // 클릭 시 메뉴 인덱스 전달
                            ))
                        ))
                    }
                </motion.ul>
            )}
            </AnimatePresence>
            <img src={src} alt={alt} className={imgCSS} />
            <span>{span}</span>
        </li>
    )
}
