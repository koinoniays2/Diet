import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiGetMemo, apiPostCreateMemo } from "../api";
import { ClipLoader, FadeLoader } from "react-spinners";
import { formatDate } from "../lib/formatDate";

export default function MemoModal({ folderID, folderName, setFolderID, setFolderName, baseColor }) {
    const { register, handleSubmit } = useForm();
    const queryClient = useQueryClient();

    // 메모 불러오기
    const { data, isLoading } = useQuery(["getMemo", folderID], () => apiGetMemo(folderID), {
        enabled: !!folderID, // folderID가 존재할 때만 쿼리 실행
    });
    // 메모 저장하기
    const { mutate, isLoading: isSaveLoading } = useMutation(apiPostCreateMemo, {
        onSuccess: () => {
            queryClient.invalidateQueries("getMemo"); // 메모 목록 갱신
            queryClient.invalidateQueries("getFolder"); // 폴더 갱신
            // setFolderID(null); // 모달 닫기
            // setFolderName(null); // 메모 이름 초기화
        }
    });
    const onSubmit = (data) => {
        mutate({ folderId: folderID, folderName, ...data }); // 폴더 ID와 이름 포함
    };
    return (
        <div className={`w-full h-full p-4 relative flex flex-col gap-8
                ${baseColor}`}>
            {/* 폴더 명, 닫기 버튼 */}
            <div>
                <button type="button" className="absolute left-4 top-2 text-3xl"
                    onClick={() => {
                        setFolderID(null);
                        setFolderName(null);
                    }}>X</button>
                <input className="w-full font-bold text-xl text-center py-4" value={folderName} 
                onChange={(e) => setFolderName(e.target.value)}/>
            </div>
            {/* 메모 쓰기 */}
            <form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
                {isLoading ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <FadeLoader />
                    </div>
                ) : (
                    <>
                        <textarea
                            className="w-full h-full resize-none"
                            placeholder="메모를 입력하세요."
                            {...register("memo")}
                            defaultValue={data?.memo[0]?.memo}
                        />
                        {data?.memo?.[0]?.createdAt && (
                            <p className="absolute left-1/2 -translate-x-1/2 top-14 text-gray-400">
                                {formatDate(data.memo[0].createdAt)}
                            </p>
                        )}
                    </>
                )}
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
