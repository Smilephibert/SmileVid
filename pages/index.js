import { useState, useRef } from "react";

export default function Home() {
  const [videoPreviews, setVideoPreviews] = useState([null, null, null]);
  const [mutedStates, setMutedStates] = useState([false, false, false]);
  const [playbackRates, setPlaybackRates] = useState([1, 1, 1]);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  const handleVideoChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const updatedPreviews = [...videoPreviews];
      updatedPreviews[index] = url;
      setVideoPreviews(updatedPreviews);
    }
  };

  const toggleMute = (index) => {
    const updatedMutedStates = [...mutedStates];
    updatedMutedStates[index] = !updatedMutedStates[index];
    setMutedStates(updatedMutedStates);
    if (videoRefs[index].current) {
      videoRefs[index].current.muted = updatedMutedStates[index];
    }
  };

  const changePlaybackRate = (index, rate) => {
    const updatedRates = [...playbackRates];
    updatedRates[index] = rate;
    setPlaybackRates(updatedRates);
    if (videoRefs[index].current) {
      videoRefs[index].current.playbackRate = rate;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to SmileVid</h1>
      <p className="mb-8 text-center max-w-md">
        Upload videos below, preview instantly, and start practicing basic editing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {[0, 1, 2].map((index) => (
          <div key={index} className="bg-white p-4 rounded shadow text-center">
            <p className="mb-2">Video {index + 1}</p>
            {videoPreviews[index] ? (
              <>
                <video
                  ref={videoRefs[index]}
                  src={videoPreviews[index]}
                  controls
                  muted={mutedStates[index]}
                  className="w-full h-48 object-cover mb-2"
                />
                <div className="flex justify-center gap-2 mb-2">
                  <button
                    onClick={() => toggleMute(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    {mutedStates[index] ? "Unmute" : "Mute"}
                  </button>
                  <select
                    value={playbackRates[index]}
                    onChange={(e) => changePlaybackRate(index, parseFloat(e.target.value))}
                    className="px-2 py-1 border rounded"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
              </>
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-2">
                No preview
              </div>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleVideoChange(e, index)}
              className="block mx-auto"
            />
          </div>
        ))}
      </div>
    </main>
  );
}