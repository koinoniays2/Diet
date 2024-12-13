import { useQuery } from 'react-query';
import { apiGetFolder } from '../api';
import { useEffect, useState } from 'react';
import MemoModal from './MemoModal';
import { FadeLoader } from 'react-spinners';
import checkTrue from "../assets/check_true.svg";
import checkFalse from "../assets/check_false.svg";

export default function FolderList({ folderIconColor, openFolderIconColor, baseColor, activeMenu }) {
    // 폴더 리스트 불러오기
    const { data, isLoading } = useQuery("getFolder", apiGetFolder);
    // 폴더 ID
    const [folderID, setFolderID] = useState(null);
    // 폴더 이름
    const [folderName, setFolderName] = useState(null);
    // 체크 상태 배열
    const [checkedItem, setCheckedItem] = useState([]);

    // 폴더 리스트 데이터 로드 시 체크 상태 초기화
    useEffect(() => {
        if (data?.data) {
            setCheckedItem(data.data.map(() => false));
        }
    }, [data]);
    // activeMenu가 1이 아닐 때 체크 상태 초기화
    useEffect(() => {
        if (activeMenu !== 1) {
            setCheckedItem((prevState) => prevState.map(() => false));
        }
    }, [activeMenu]);

    const checkChange = (index) => {
        setCheckedItem((prevState) => {
            const newState = [...prevState]; // 이전 상태 복사
            newState[index] = !newState[index]; // 클릭한 인덱스 상태 반전
            return newState; // 업데이트 배열 리턴
        });
    };
    return (
        <>
            <div className="min-h-[calc(100vh-157px)] p-4 flex flex-wrap justify-start content-start gap-8">
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <FadeLoader />
                    </div>
                ) : (
                    /* 폴더 리스트 */
                    data?.data?.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center basis-16 cursor-pointer relative"
                            onClick={() => {
                                setFolderID(item._id);
                                setFolderName(item.folderName);
                            }}
                        >
                            <img src={item.existMemo === 1 ? openFolderIconColor : folderIconColor} alt="folder" className="h-10" />
                            <span>{item.folderName}</span>
                            {
                                activeMenu === 1 &&
                                <form className="flex w-full h-full absolute"
                                    onClick={(e) => e.stopPropagation()}>
                                    <input type="checkbox" id={`checkbox-${index}`}
                                        checked={checkedItem[index]} onChange={() => checkChange(index)}
                                        className="appearance-none" />
                                    <label htmlFor={`checkbox-${index}`}
                                        className="w-full h-full flex justify-center items-center cursor-pointer">
                                        <img src={checkedItem[index] ? checkTrue : checkFalse} alt="checkImg" />
                                    </label>
                                </form>
                            }
                        </div>
                    ))
                )}
            </div>
            {
                // 폴더 클릭 시 메모 모달
                folderID &&
                <section className="w-full h-full p-8 absolute top-0 left-0 bg-black bg-opacity-50 z-10">
                    <MemoModal folderID={folderID} folderName={folderName} setFolderID={setFolderID} setFolderName={setFolderName} baseColor={baseColor} />
                </section>
            }
        </>
    );
}
