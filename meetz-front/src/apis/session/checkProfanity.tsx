import instance from "../axios"


const postCheckProfanity = async (accessToken: string, formData: FormData) => {
  try {
    const { data } = await instance.post('/api/meeting/check-profanity', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log(data)
    // return data.data;
  } catch (error) {
    alert(error);
  }
}

export default postCheckProfanity;