import useCheckAuth from "../../../hooks/meeting/useCheckAuth";

const ModifyPage = () => {

    useCheckAuth('MANAGER');


    return (
        <div>ModifyPage</div>
    )
}

export default ModifyPage