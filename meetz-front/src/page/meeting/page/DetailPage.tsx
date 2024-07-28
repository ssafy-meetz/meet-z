import useCheckAuth from "../../../hooks/meeting/useCheckAuth";

const DetailPage = () => {

    useCheckAuth('MANAGER');

    return (
        <div>DetailPage</div>
    )
}

export default DetailPage