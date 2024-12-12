import { useQuery } from 'react-query';
import { apiGetFolder } from '../api';
import { useState } from 'react';
import MemoModal from './MemoModal';

export default function FolderList({ folderIconColor, openFolderIconColor, baseColor }) {
    // 폴더 리스트 불러오기
    const { data, isLoading } = useQuery("getFolder", apiGetFolder);
    // 폴더 ID
    const [ folderID, setFolderID ] = useState(null);
    // 폴더 이름
    const [ folderName, setFolderName ] = useState(null);

    return (
        <>
        <div className="min-h-[calc(100vh-93px)] p-4 flex flex-wrap justify-start content-start gap-8">
            {/* 폴더 리스트 */}
            {data?.data?.map((item, index) => (
                <div key={index} className="flex flex-col items-center basis-16 cursor-pointer"
                onClick={() => {
                    setFolderID(item._id);
                    setFolderName(item.folderName);
                    }}>
                    <img src={folderIconColor} alt="folder" className="h-10"/>
                    <span>{item.folderName}</span>
                </div>
            ))}
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
