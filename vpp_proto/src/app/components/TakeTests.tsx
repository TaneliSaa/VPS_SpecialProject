
interface Props {
    isOpen: Boolean;
    onClose: () => void;
    simulationId: number | null;
}

const TakeTests = ({isOpen, onClose, simulationId}: Props)=> {

    if (!isOpen) return null;


    const handleClick = async () => {

        const res = await fetch("/api/generateTest", {
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                simulation_id: simulationId,
            }),
        });
    }


    return (

        <div>

            <h2 className="text-lg font-bold">Take Test</h2>

            <div className="flex col gap-2">
                <button className="btn btn-primary">Test 1</button>
                <button className="btn btn-primary">Test 2</button>
                <button className="btn btn-primary">Test 3</button>

            </div>

            <button
                onClick={onClose}
                className="btn btn-primary translate-y-75"
            >
                Close
            </button>
        </div>
    );
};

export default TakeTests;