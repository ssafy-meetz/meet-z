import axios, { AxiosError } from 'axios';

const OPENVIDU_SERVER_URL = `https://i11c108.p.ssafy.io:8443`;
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';
export const createSession = async (sessionIds: string): Promise<string> => {
    try {
        const data = JSON.stringify({ customSessionId: sessionIds });
        const response = await axios.post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
            data,
            {
                headers: {
                    Authorization: `Basic ${btoa(
                        `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
                    )}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        return (response.data as { id: string }).id;
    } catch (error) {
        const errorResponse = (error as AxiosError)?.response;

        if (errorResponse?.status === 409) {
            return sessionIds;
        }

        return '';
    }
};

export const createToken = (sessionIds: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const data = {};
        axios
            .post(
                `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionIds}/connection`,
                data,
                {
                    headers: {
                        Authorization: `Basic ${btoa(
                            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
                        )}`,

                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(response => {
                resolve((response.data as { token: string }).token);
            })
            .catch(error => reject(error));
    });
};
