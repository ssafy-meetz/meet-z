import instance from "../axios"


const postCheckProfanity = async (accessToken: string, formData: FormData) => {
  try {
    const { data } = await instance.post('/api/meeting/check-profanity', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return data.code === 200;
  } catch (error) {
    return false;
  }
}

export default postCheckProfanity;