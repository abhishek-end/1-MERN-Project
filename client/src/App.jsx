import "./../index.css";
import Form from "./components/Form";
import Graph from "./components/Graph";
export default function App() {
  return (
    <div className='App'>
      <div className='container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-900 '>
        <h1 className='text-4xl py-8 mb-10 bg-slate-800 text-white rounded-sm'>
          Expense Tracker
        </h1>
        {/* // grid columns */}
        <div className='grid md:grid-cols-2 gap-4 '>
          <Graph />
          {/* form */}
          <Form />
        </div>
      </div>
    </div>
  );
}
