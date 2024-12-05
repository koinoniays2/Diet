import Red from "../assets/close_folder_red.svg";
import Orange from "../assets/close_folder_orange.svg";
import Yellow from "../assets/close_folder_yellow.svg";
import Green from "../assets/close_folder_green.svg";
import Blue from "../assets/close_folder_blue.svg";
import Purple from "../assets/close_folder_purple.svg";
import Black from "../assets/close_folder_gray.svg";
import openRed from "../assets/folder_red.svg";
import openOrange from "../assets/folder_orange.svg";
import openYellow from "../assets/folder_yellow.svg";
import openGreen from "../assets/folder_green.svg";
import openBlue from "../assets/folder_blue.svg";
import openPurple from "../assets/folder_purple.svg";
import openBlack from "../assets/folder_gray.svg";

// 컬러 데이터 통합
export const colorData = {
    folderColors: [Red, Orange, Yellow, Green, Blue, Purple, Black],
    openFolderColors: [openRed, openOrange, openYellow, openGreen, openBlue, openPurple, openBlack],
    bgColors: ["bg-color-red", "bg-color-orange", "bg-color-yellow", "bg-color-green", "bg-color-blue", "bg-color-purple", "bg-color-black"],
};

// 인덱스를 기반으로 데이터 반환
export const getFolderColor = (index) => colorData.folderColors[index];
export const getOpenFolderColor = (index) => colorData.openFolderColors[index];
export const getBaseColor = (index) => colorData.bgColors[index];