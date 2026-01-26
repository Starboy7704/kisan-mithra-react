const RequestCard = ({ farmer, issue, onAccept, onReject }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow">
      <p>
        <strong>Farmer:</strong> {farmer}
      </p>
      <p>
        <strong>Issue:</strong> {issue}
      </p>
      <div className="mt-3 flex space-x-2">
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={onAccept}
        >
          Accept
        </button>
        <button 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
