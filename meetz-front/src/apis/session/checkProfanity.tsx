import instance from "../axios"

const postCheckProfanity = async (email: string, accessToken: string, formData: FormData) => {
  try {
    const { data } = await instance.post(`/api/meeting/check-profanity?email=${email}`, formData, {
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