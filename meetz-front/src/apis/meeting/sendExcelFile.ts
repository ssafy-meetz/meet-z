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
        case 500:
          throw new Error("Internal Server Error");
        case 400:
          throw new Error("엑셀 파일만 첨부할 수 있습니다.");
        default:
          console.log(error.response)
          throw new Error("알 수 없는 에러가 발생했습니다.");
      }
    }
  }
}

export default sendExcelFile