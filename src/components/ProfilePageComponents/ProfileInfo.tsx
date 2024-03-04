"use client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export function UserBio() {
    const [bio, setBio] = useState<string>("");
    const [writingBio, setWritingBio] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setWritingBio(false);
    };

    return (
        <>
            {!bio && !writingBio && (
                <div className="font-medium leading-relaxed mb-4 flex items-center">
                    <span>Write User Bio</span>
                    <button
                        aria-label="Edit Bio"
                        className="ml-2 p-2 rounded-full bg-cyan-500 hover:bg-cyan-700 cursor-pointer flex items-center justify-center"
                        onClick={() => setWritingBio(true)}
                    >
                        <FaEdit className="text-white" />
                    </button>
                </div>
            )}
            {writingBio && (
                <form onSubmit={handleSubmit}>
                    <textarea
                        aria-label="User Bio"
                        className="mb-4 border-black border-2 p-2 rounded"
                        rows={4}
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                    />
                    <button
                        className="block shadow bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mx-auto"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            )}
            {bio && !writingBio && (
                <div className="mb-4">
                    <p className="font-light leading-relaxed text-slate-600">{bio}</p>
                    <button
                        aria-label="Edit Bio"
                        className="mt-2 p-2 rounded-full bg-cyan-500 hover:bg-cyan-700 cursor-pointer flex items-center justify-center"
                        onClick={() => setWritingBio(true)}
                    >
                        <FaEdit className="text-white" /><span className="ml-2 text-white">Edit Bio</span>
                    </button>
                </div>
            )}
        </>
    );
}
