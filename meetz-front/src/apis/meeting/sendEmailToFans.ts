import instance from "../axios"


const sendEmailToFans = async (meetingId: number, accessToken: string) => {
    try {
        const { data } = await instance.get(`/api/meeting/${meetingId}/sendmail`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        console.log(data)
        if (data.code === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }
}

export default sendEmailToFans;