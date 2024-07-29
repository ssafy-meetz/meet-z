import instance from "../axios"

const sendExcelFile = async (file: FormData, accessToken: string) => {
  console.log(file)
  try {
    const { data } = await instance.post('/api/meeting/file', {
      file
    }, {
      headers: {
        'Content-Type': 'Multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (data.status === 200 && data.data) {
      console.log(data)
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 500:
          throw new Error("Internal Server Error");
        case 400:
          throw new Error("파일을 첨부해주세요.");
        default:
          console.log(error.response)
          throw new Error("알 수 없는 에러가 발생했습니다.");
      }
    }
  }
}

export default sendExcelFile