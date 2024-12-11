import { useQuery } from 'react-query';
import { apiGetFolder } from '../api';

export default function FolderList({ folderIconColor, openFolderIconColor }) {
    // 폴더 읽기
    const { data, isLoading } = useQuery("getFolder", apiGetFolder);
    return (
        <div className="min-h-[calc(100vh-93px)] p-4 flex flex-wrap justify-start content-start gap-8">
            {/* 폴더 리스트 */}
            {data?.data.map((item, index) => (
                <div key={index} className="flex flex-col justify-center items-center">
                    {/* folderIconColor 값이 유효한지 확인 후 이미지 렌더링 */}
                    <img src={folderIconColor} alt="folder" className="h-10"/>
                    <span>{item.folderName}</span>
                </div>
            ))}
        </div>
    );
}
