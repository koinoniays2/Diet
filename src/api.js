const BASE_URL = process.env.REACT_APP_BASE_URL;

// 로그인 여부 확인
/* 클라이언트와 서버가 다른 도메인(포트 포함)일 경우
모든 요청에 대해 credentials: "include"를 설정해야 쿠키가 제대로 작동
*/
export async function apiGetLoginStatus() {
    try{
        return await fetch(`${BASE_URL}/user/login-status`, {
            method: "GET",
            credentials: "include"
        }).then((res) => res.json());
    }catch(error) {
        console.log(error);
    };
};
/* 세션 ID가 없으면 서버에서 result : false, user : null 응답을 보내기 때문에, 
로그인되지 않았음을 알 수 있음 */
// 로그인
export async function apiPostLogin(data) {
    try {
        return await fetch (`${BASE_URL}/user/login`, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // 헤더에 쿠키를 포함하여 서버로 전송
            body: JSON.stringify(data)
        }).then(res => res.json());
    }catch(error) {
        console.log(error);
    };
};
// 로그아웃
export async function apiPostLogout() {
    try {
        return await fetch(`${BASE_URL}/user/logout`, {
            method: "POST",
            credentials: "include" // 세션 쿠키를 포함하여 서버에 전송
        }).then(res => res.json());
    } catch (error) {
        console.log(error);
    }
};
// 회원가입
export async function apiPostCreateUser(data) {
    try {
        return await fetch (`${BASE_URL}/user/create`, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }catch(error) {
        console.log(error);
    }
}

// 폴더 생성
export async function apiPostCreateFolder(data) {
    try {
        return await fetch (`${BASE_URL}/folder/create`, {
            method:  "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        }).then(res => res.json());
    }catch(error) {
        console.log(error);
    }
}
// 폴더 읽기
export async function apiGetFolder() {
    try{
        return await fetch(`${BASE_URL}/folder/list`, {
            method: "GET",
            credentials: "include"
        }).then((res) => res.json());
    }catch(error) {
        console.log(error);
    };
}

// 메모 저장
export async function apiPostCreateMemo(data) {
    try {
        return await fetch(`${BASE_URL}/memo/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // 세션 쿠키 포함
            body: JSON.stringify(data) // 데이터 추가
        }).then((res) => res.json());
    } catch (error) {
        console.log(error);
    }
}
// 메모 불러오기
export async function apiGetMemo(folderId) {
    try {
        const response = await fetch(`${BASE_URL}/memo/list?folderId=${folderId}`, {
            method: "GET",
            credentials: "include",
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

// 폴더 삭제
export async function apiDeleteFolder(folderId) {
    try {
        return await fetch(`${BASE_URL}/folder/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ folderId }),
        }).then((res) => res.json());
    } catch (error) {
        console.error(error);
    }
}