import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiGetMemo, apiPostCreateMemo } from "../api";

export default function MemoModal({ folderID, folderName, setFolderID, setFolderName, baseColor }) {
    const { register, handleSubmit } = useForm();
    const queryClient = useQueryClient();
    
    const { data, isLoading } = useQuery(["getMemo", folderID], () => apiGetMemo(folderID), {
        enabled: !!folderID, // folderID가 존재할 때만 쿼리 실행
    });

    const { mutate } = useMutation(apiPostCreateMemo, {
        onSuccess: () => {
            queryClient.invalidateQueries("getMemo"); // 메모 목록 갱신
            setFolderID(null); // 모달 닫기
            setFolderName(null); // 메모 이름 초기화
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
                    <h1 className="font-bold text-xl text-center py-4">{folderName}</h1>
                </div>
                {/* 메모 쓰기 */}
                <form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
                    <textarea className="w-full h-full 
                    bg-transparent outline-none resize-none"
                        placeholder="메모를 입력하세요."
                        {...register("memo")}
                    />
                    <button type="submit"
                        className="absolute top-14 right-4">저장</button>
                </form>
            </div>
    )
}
