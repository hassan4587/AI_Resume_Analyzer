import { useState } from "react";

function App() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("BUTTON CLICKED");

    if (!file) {
      alert("Please select a resume first");
      return;
    }

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });
      console.log("request sent");

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
      console.log(data);
    } catch (err) {
      console.error(err);
      setResult("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">
          AI Resume Analyzer
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md p-2 cursor-pointer"
          />

          {file && (
            <p className="text-sm text-gray-500">Selected: {file.name}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md border">
            <h3 className="font-medium mb-2">Result:</h3>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
