import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiGetMemo, apiPostCreateMemo } from "../api";
import { ClipLoader } from "react-spinners";
import { formatDate } from "../lib/formatDate";

export default function MemoModal({ folderID, folderName, setFolderID, setFolderName, baseColor }) {
    const { register, handleSubmit } = useForm();
    const queryClient = useQueryClient();

    // 메모 클릭 시 내용 불러오기 (FolderList.jsx에서 전달 받은 folderID로 불러온다.)
    // ["getMemo", folderID] -> 각각의 폴더 데이터를 캐싱(데이터 임시 저장)하기 위해
    const { data, isLoading } = useQuery(["getMemo", folderID], () => apiGetMemo(folderID), {
        enabled: !!folderID, // folderID가 존재할 때만 쿼리 실행
    });
    // 메모 저장 및 수정
    const { mutate, isLoading: isSaveLoading } = useMutation(apiPostCreateMemo, {
        onSuccess: () => {
            queryClient.invalidateQueries("getMemo"); // 메모 내용 갱신
            queryClient.invalidateQueries("getFolder"); // 폴더 갱신(제목 변경 시 반영을 위해)
            // setFolderID(null); // 모달 닫기
            // setFolderName(null); // 메모 이름 초기화
        }
    });
    const onSubmit = (data) => {
        mutate({ folderId: folderID, folderName, ...data }); // 폴더 ID와 폴더 이름 포함
    };
    return (
        <div className={`w-full h-full p-4 relative flex flex-col gap-8
                ${baseColor}`}>
            {/* 폴더 명, 닫기 버튼 */}
            <div>
                {/* X 버튼 */}
                <button type="button" className="absolute left-4 top-2 text-3xl"
                    onClick={() => {
                        setFolderID(null);
                        setFolderName(null);
                    }}>X</button>
                {/* 폴더 명 */}
                <input className="w-full font-bold text-xl text-center py-4" value={folderName} 
                onChange={(e) => setFolderName(e.target.value)}/>
            </div>
            {/* 메모 내용 */}
            <form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
                {/* 메모 불러오기 로딩 */}
                {isLoading ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <ClipLoader />
                    </div>
                ) : (
                    <>
                        <textarea
                            className="w-full h-full resize-none"
                            placeholder="메모를 입력하세요."
                            {...register("memo")}
                            defaultValue={data?.memo[0]?.memo}
                        />
                        {/* 날짜가 있으면 표시 */}
                        {data?.memo?.[0]?.createdAt && (
                            <p className="absolute left-1/2 -translate-x-1/2 top-14 text-gray-400">
                                {formatDate(data.memo[0].createdAt)}
                            </p>
                        )}
                    </>
                )}
                {/* 저장 버튼 */}
                {isSaveLoading ? (
                    <div className="absolute top-14 right-4">
                        <ClipLoader size={30}/>
                    </div>
                ) : (
                    <button type="submit" className="absolute top-14 right-4">저장</button>
                )}
            </form>
        </div>
    )
}
