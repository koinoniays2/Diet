import { useEffect, useRef, useState } from "react";
import red from "./assets/close_folder_red.svg";
import xIcon from "./assets/xicon.svg";
import setting from "./assets/setting.svg";


function App() {
  const [baseColor, setBaseColor] = useState("bg-color-red");
  const [folderIconColor, setFolderIconColor] = useState(red);
  const [borderCSS, setBorderCSS] = useState(["border-custom-1", "border-custom-1", "border-custom-1"]);
  const [menuClickOn, setMenuClickOn] = useState([false, false, false]);
  
  const ICON_CONTAINER = `flex-1 flex flex-col items-center justify-center py-2 cursor-pointer`;

  const menus = [
    {
      menu : [
        { src: folderIconColor, alt: "폴더", className: "h-10", span: "새폴더" },
        { src: xIcon, alt: "폴더삭제", className: "h-11", span: "폴더삭제" },
        { src: setting, alt: "환경설정", className: "h-11", span: "환경설정" }
      ]
    }
  ];
  const menuClick = (menuIndex) => {
    // useState의 함수형 업데이트
    setMenuClickOn((prevState) =>
      prevState.map((_, i) => (i === menuIndex ? !prevState[i] : prevState[i]))
    );
    // 클릭 시 메뉴 borderCSS
    setBorderCSS((prevCSS) =>
      prevCSS.map((css, i) => {
        // 클릭된 메뉴 토글
        if (i === menuIndex) {
          return css === "border-custom-1" ? "border-custom-2" : "border-custom-1";
        }
        // 다른 메뉴는 비활성화
        return "border-custom-1";
      })
    );
  };

  const menuRef = useRef(null); // 메뉴 영역 감지용 ref
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // 메뉴 바깥을 클릭하면 모든 상태 초기화
      setBorderCSS(["border-custom-1", "border-custom-1", "border-custom-1"]);
    }
  };

  useEffect(() => {
    // window에 클릭 이벤트 추가
    window.addEventListener("click", handleOutsideClick);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <main className={`${baseColor} min-h-screen flex items-center justify-center`}>
      <section className="h-full min-w-[360px] max-w-[480px]">
        <footer ref={menuRef} // 메뉴 영역 감지
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full min-w-[360px] max-w-[480px] flex">
          {
            menus.map((item) => (
              item.menu.map((menu, menuIndex) => (
                <div key={`${menuIndex}`} className={`${ICON_CONTAINER} ${borderCSS[menuIndex]}`}
                onClick={() => menuClick(menuIndex)}>
                  <img src={menu.src} alt={menu.alt} className={menu.className} />
                  <span>{menu.span}</span>
                </div>
              ))
            ))
          }
          {/* <div className={`${ICON_CONTAINER}`}>
            <img src={folderIconColor} alt="폴더" className="h-10" />
            <span>새폴더</span>
          </div>
          <div className={`${ICON_CONTAINER}`}>
            <img src={xIcon} alt="폴더삭제" className="h-11" />
            <span>폴더삭제</span>
          </div>
          <div className={`${ICON_CONTAINER}`}>
            <img src={setting} alt="환경설정" className="h-11" />
            <span>환경설정</span>
          </div> */}
        </footer>
      </section>
    </main>
  );
}

export default App;
