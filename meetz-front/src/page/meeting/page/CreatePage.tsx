import useCheckAuth from "../../../hooks/meeting/useCheckAuth";

const CreateMeeting = () => {

    useCheckAuth('MANAGER');

    return (
        <div>CreateMeeting</div>
    )
}

export default CreateMeeting