import instance from "../axios"

const sendExcelFile = async (formData: FormData, accessToken: string) => {
  try {
    const { data } = await instance.post('/api/meeting/file', formData, {
      headers: {
        'Content-Type': 'Multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (data.code === 200 && data) {
      return data.data;
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 403:
          throw new Error("양식에 맞지 않는 파일입니다. 올바른 양식을 사용해주세요.");
        case 500:
          throw new Error("양식에 맞지 않는 파일입니다. 올바른 양식을 사용해주세요.");
        case 400:
          throw new Error("명단이 비어있습니다. 양식 파일에 팬을 추가해주세요.");
        default:
          throw new Error("알 수 없는 에러가 발생했습니다.");
      }
    }
  }
}

export default sendExcelFile