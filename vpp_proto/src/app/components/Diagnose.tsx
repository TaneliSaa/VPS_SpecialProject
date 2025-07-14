import { useState } from "react";



const Diagnose = ({
    isOpen,
    onClose,
}: {
    isOpen: Boolean;
    onClose: () => void;
}) => {

    const [diagnosis, setDiagnosis] = useState("");

    if (!isOpen) return null;



    const handleSubmit = () => {

        
    }


    return (

        <div>

            <h2 className="text-lg font-bold">Diagnose</h2>

            <form onSubmit={handleSubmit}>

                <label className="block text-sm font-medium" />
                Enter your diagnosis:
                <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full p-2 mt-1 border rounder-lg"
                    placeholder="Type your diagnosis here..."
                    name="diagnose input"
                >
                </input>
                <div className="mt-3 flex gap-2 translate-y-70">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className="btn btn-primary"
                    >
                        Close
                    </button>

                </div>
            </form>



        </div>
    );
};

export default Diagnose;