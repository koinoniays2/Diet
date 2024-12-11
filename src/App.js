import { useEffect, useRef, useState } from "react";
import xIcon from "./assets/xicon.svg";
import setting from "./assets/setting.svg";
import FooterMenu from "./components/FooterMenu";
import Cookies from "js-cookie";
import { getBaseColor, getFolderColor, getOpenFolderColor } from "./lib/SettingColor";
import NewOpenModal from "./components/NewOpenModal";

function App() {
  const [baseColor, setBaseColor] = useState(null); // 배경 색
  const [folderIconColor, setFolderIconColor] = useState(null); // 닫힌 폴더 색
  const [openFolderIconColor, setOpenFolderIconColor] = useState(null); // 열린 폴더 색
  const [activeMenu, setActiveMenu] = useState(null); // 현재 활성화된 메뉴 인덱스
  const [openModal, setOpenModal] = useState(true); // 새폴더 모달

  // 색상 쿠키에서 읽어오기
  useEffect(() => {
    const savedBaseIndex = Cookies.get("BaseIndex");
    // 쿠키에 베이스 인덱스 여부 확인 후 컬러 지정
    if (savedBaseIndex) {
      setBaseColor(getBaseColor(savedBaseIndex));
      setFolderIconColor(getFolderColor(savedBaseIndex));
      setOpenFolderIconColor(getFolderColor(savedBaseIndex));
    } else {
      setBaseColor(getBaseColor(0));
      setFolderIconColor(getFolderColor(0));
      setOpenFolderIconColor(getOpenFolderColor(0));
    }

  }, []);

  // 메뉴 영역 감지용 ref
  const menuRef = useRef(null);
  // 메뉴 바깥을 클릭하면 모든 상태 초기화
  const outsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveMenu(null); // 모든 메뉴 비활성화
    };
  };
  useEffect(() => {
    // window에 클릭 이벤트 추가
    window.addEventListener("click", outsideClick);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("click", outsideClick);
    };
  }, []);

  // 메뉴 데이터
  const menus = [
    {
      menu: [
        { src: folderIconColor, alt: "폴더", className: "h-10", span: "새폴더" },
        { src: xIcon, alt: "폴더삭제", className: "h-11", span: "폴더삭제" },
        { src: setting, alt: "환경설정", className: "h-11", span: "환경설정" }
      ]
    }
  ];

  const menuClick = (index) => {
    // 함수형 업데이트 : prevIndex는 setActiveMenu의 이전 상태를 나타내는 매개변수
    setActiveMenu((prevIndex) => (prevIndex === index ? null : index)); // 클릭된 메뉴 인덱스 업데이트
    // 새폴더 클릭 처리
    if (index === 0) {
      setOpenModal(true);
    }
  };

  return (
    <main className={`${baseColor} flex items-center justify-center`}>
      <section className="w-full max-w-[480px]">
        <div className="min-h-[calc(100vh-93px)]">

        </div>
        {/* 메뉴 */}
        <footer ref={menuRef} // ref : 메뉴 영역 감지
          className="sticky bottom-0">
          <nav>
            <ul className="flex">
              {
                menus.map((item) => (
                  item.menu.map((menu, index) => (
                    <FooterMenu key={index} index={index} activeMenu={activeMenu} // 메뉴의 index와 현재 클릭 된 메뉴 전달
                      divCSS={activeMenu === index ? "border-custom-2" : "border-custom-1"} // 클릭 된 메뉴와 인덱스가 같은지 확인
                      src={menu.src} alt={menu.alt} imgCSS={`${menu.className}`} span={menu.span} // 메뉴 데이터
                      onClick={() => menuClick(index)} // 클릭 된 메뉴 인덱스 저장
                      setBaseColor={setBaseColor} setFolderIconColor={setFolderIconColor} setOpenFolderIconColor={setOpenFolderIconColor} // 배경 컬러, 폴더 아이콘 컬러
                      />
                  ))
                ))
              }
            </ul>
          </nav>
        </footer>
      </section>
      {
        openModal && <NewOpenModal setOpenModal={setOpenModal} />
      }
    </main>
  );
}

export default App;
